package com.dt.behuuchiencar.controller.Admin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dt.behuuchiencar.constant.SuccessConstants;
import com.dt.behuuchiencar.exception.MessageException;
import com.dt.behuuchiencar.model.response.Response;
import com.dt.behuuchiencar.model.response.ResponseBody;
import com.dt.behuuchiencar.model.response.ResponsesBody;
import com.dt.behuuchiencar.service.HistoryService;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("api/admin/history")
public class HistoryAdminController {

    @Autowired
    private HistoryService historyService;
    
    @GetMapping()
    public ResponseEntity<?> getAllHistory() {
        try {
            ResponsesBody body = new ResponsesBody();
            body.setCode(SuccessConstants.OK_CODE);
            body.setMessage(Arrays.asList(SuccessConstants.OK_MESSAGE));
            body.setData(historyService.getAllHistory());
            return ResponseEntity.ok().body(body);
        } catch (MessageException e) {
            Response response = new Response();
            response.setCode(e.getErrorCode());
            response.setMessage(Arrays.asList(e));
            return ResponseEntity.status(e.getErrorCode()).body(response);
        }
    }

    @GetMapping("car/{carId}")
    public ResponseEntity<?> getAllHistoryByCar(@PathVariable Long carId) {

        try {
            ResponseBody body = new ResponseBody();
            body.setCode(SuccessConstants.OK_CODE);
            body.setMessage(Arrays.asList(SuccessConstants.OK_MESSAGE));
            body.setData(historyService.getAllHistoryByCar(carId));
            return ResponseEntity.ok().body(body);
        } catch (MessageException e) {
            Response response = new Response();
            response.setCode(e.getErrorCode());
            response.setMessage(Arrays.asList(e));
            return ResponseEntity.status(e.getErrorCode()).body(response);
        }
    }

    @GetMapping("customer/{customerId}")
    public ResponseEntity<?> getAllHistoryByCustomer(@PathVariable Long customerId) {

        try {
            ResponseBody body = new ResponseBody();
            body.setCode(SuccessConstants.OK_CODE);
            body.setMessage(Arrays.asList(SuccessConstants.OK_MESSAGE));
            body.setData(historyService.getAllHistoryByCustomer(customerId));
            return ResponseEntity.ok().body(body);
        } catch (MessageException e) {
            Response response = new Response();
            response.setCode(e.getErrorCode());
            response.setMessage(Arrays.asList(e));
            return ResponseEntity.status(e.getErrorCode()).body(response);
        }
    }
    
    
}
