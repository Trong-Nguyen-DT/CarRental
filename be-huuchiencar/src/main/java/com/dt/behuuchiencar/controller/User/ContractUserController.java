package com.dt.behuuchiencar.controller.User;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dt.behuuchiencar.constant.ErrorConstants;
import com.dt.behuuchiencar.constant.SuccessConstants;
import com.dt.behuuchiencar.exception.MessageException;
import com.dt.behuuchiencar.model.request.ContractInput;
import com.dt.behuuchiencar.model.response.Response;
import com.dt.behuuchiencar.model.response.ResponseBody;
import com.dt.behuuchiencar.model.response.ResponsesBody;
import com.dt.behuuchiencar.service.ContractService;

import jakarta.validation.Valid;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;




@RestController
@RequestMapping("api/user/contracts")
public class ContractUserController {

    @Autowired
    private ContractService contractService;
    
    @GetMapping()
    public ResponseEntity<?> getAllContract() {
        try {
            ResponsesBody responseBody = new ResponsesBody();
            responseBody.setCode(SuccessConstants.OK_CODE);
            responseBody.setMessage(Arrays.asList(SuccessConstants.OK_MESSAGE));
            responseBody.setData(contractService.getAllContract());
            return ResponseEntity.ok().body(responseBody);
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(createErrorResponse(e));
        }
    }

    @PostMapping()
    public ResponseEntity<?> createContract(@Valid ContractInput input) {
        try {
            ResponseBody body = new ResponseBody();
            body.setCode(SuccessConstants.CREATED_CODE);
            body.setMessage(Arrays.asList(SuccessConstants.CREATED_MESSAGE));
            body.setData(contractService.createContract(input));
            return ResponseEntity.status(HttpStatus.CREATED).body(body);
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(createErrorResponse(e));
        }
    }
    

    private Response createErrorResponse(MessageException e) {
        Response response = new Response();
        response.setCode(e.getErrorCode());
        response.setMessage(Arrays.asList(e));  
        return response;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response handleValidationExceptions(MethodArgumentNotValidException ex){
        Response response = new Response();
        response.setCode(ErrorConstants.INVALID_DATA_CODE);
        List<Object> messages = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach((error)->{
            String fieldName = ((FieldError) error).getField();
            messages.add(new MessageException(fieldName + ": " + error.getDefaultMessage(), response.getCode()));
        });
        response.setMessage(messages);
        return response;
    }
    
}
