package com.dt.behuuchiencar.controller.Admin;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dt.behuuchiencar.constant.ErrorConstants;
import com.dt.behuuchiencar.constant.SuccessConstants;
import com.dt.behuuchiencar.exception.MessageException;
import com.dt.behuuchiencar.model.request.CarUpdateInput;
import com.dt.behuuchiencar.model.response.Response;
import com.dt.behuuchiencar.model.response.ResponseBody;
import com.dt.behuuchiencar.service.CarService;

import jakarta.validation.Valid;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/admin/cars")
public class CarAdminController {

    @Autowired
    private CarService carService;

    @PutMapping()
    public ResponseEntity<?> updateCar(@Valid @RequestBody CarUpdateInput car) {
        try {
            ResponseBody body = new ResponseBody();
            body.setCode(SuccessConstants.OK_CODE);
            body.setMessage(Arrays.asList(SuccessConstants.OK_MESSAGE));
            body.setData(carService.updateCar(car));
            return ResponseEntity.ok().body(body);
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(createErrorResponse(e));
        }
    }

    

    @DeleteMapping("{carId}")
    public ResponseEntity<?> deleteCar(@PathVariable Long carId) {
        try {
            ResponseBody body = new ResponseBody();
            body.setCode(SuccessConstants.OK_CODE);
            body.setMessage(Arrays.asList(SuccessConstants.OK_MESSAGE));
            body.setData(carService.deleteCar(carId));
            return ResponseEntity.ok().body(body);
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
