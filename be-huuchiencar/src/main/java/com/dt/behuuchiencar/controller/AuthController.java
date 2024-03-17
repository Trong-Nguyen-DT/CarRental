package com.dt.behuuchiencar.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dt.behuuchiencar.constant.ErrorConstants;
import com.dt.behuuchiencar.constant.SuccessConstants;
import com.dt.behuuchiencar.convertor.UserConvertor;
import com.dt.behuuchiencar.exception.MessageException;
import com.dt.behuuchiencar.model.request.LoginInput;
import com.dt.behuuchiencar.model.response.LoginResponse;
import com.dt.behuuchiencar.model.response.Response;
import com.dt.behuuchiencar.model.response.ResponseBody;
import com.dt.behuuchiencar.security.jwt.JwtProvider;
import com.dt.behuuchiencar.security.userprincal.CustomAuthenticationProvider;
import com.dt.behuuchiencar.security.userprincal.UserPrinciple;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private CustomAuthenticationProvider customAuthenticationProvider;

    @Autowired
    private JwtProvider jwtProvider;

    @PostMapping("login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginInput loginInput) {
        try {
            Authentication authentication = customAuthenticationProvider.authenticate(
                    new UsernamePasswordAuthenticationToken(loginInput.getUsername(), loginInput.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtProvider.createToken(authentication);
            UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setCode(SuccessConstants.OK_CODE);
            loginResponse.setMessage(Arrays.asList(SuccessConstants.OK_MESSAGE));
            loginResponse.setToken(token);
            loginResponse.setData(UserConvertor.userPrincipleToModel(userPrinciple));
            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
        } catch (MessageException e) {
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setCode(e.getErrorCode());
            loginResponse.setMessage(Arrays.asList(e));
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(loginResponse);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null) {
            SecurityContextHolder.clearContext();
        }
        ResponseBody response = new ResponseBody();
        response.setCode(SuccessConstants.OK_CODE);
        response.setMessage(Arrays.asList(SuccessConstants.OK_MESSAGE));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Response handleValidationExceptions(MethodArgumentNotValidException ex) {
        Response response = new Response();
        response.setCode(ErrorConstants.INVALID_CREDENTIALS_CODE);
        List<Object> messages = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            messages.add(new MessageException(fieldName + ": " + error.getDefaultMessage(), response.getCode()));
        });
        response.setMessage(messages);
        return response;
    }
}
