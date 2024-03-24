package com.dt.behuuchiencar.controller.Admin;

import java.time.LocalDate;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dt.behuuchiencar.constant.SuccessConstants;
import com.dt.behuuchiencar.exception.MessageException;
import com.dt.behuuchiencar.model.response.Response;
import com.dt.behuuchiencar.model.response.ResponseBody;
import com.dt.behuuchiencar.service.DashboardService;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/admin/dashboard")
public class DashboardAdminController {
    
    @Autowired
    private DashboardService dashboardService;

    @GetMapping()
    public ResponseEntity<?> getInfoDashboard(@RequestParam(required = false) Integer year,
                                                @RequestParam(required = false) Integer month) {
        LocalDate startDate;
        LocalDate endDate;
        if (year != null && month != null) {
            startDate = LocalDate.of(year, month, 1);
            endDate = startDate.plusMonths(1).minusDays(1);
        } else if (year != null) {
            startDate = LocalDate.of(year, 1, 1);
            endDate = LocalDate.of(year, 12, 31);
        } else {
            LocalDate now = LocalDate.now();    
            startDate = LocalDate.of(now.getYear(), now.getMonth(), 1);
            endDate = now.withDayOfMonth(now.getMonth().length(now.isLeapYear()));  
        }

        try {
            ResponseBody body = new ResponseBody();
            body.setCode(SuccessConstants.OK_CODE);
            body.setMessage(Arrays.asList(SuccessConstants.OK_MESSAGE));
            body.setData(dashboardService.getInfoDashboard(startDate, endDate));
            return ResponseEntity.ok().body(body);
        } catch (MessageException e) {
            Response response = new Response();
            response.setCode(e.getErrorCode());
            response.setMessage(Arrays.asList(e));
            return ResponseEntity.status(e.getErrorCode()).body(response);
        }                                       
    }
    
}
