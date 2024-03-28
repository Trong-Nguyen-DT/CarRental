package com.dt.behuuchiencar.controller.Admin;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dt.behuuchiencar.constant.ErrorConstants;
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
                                                @RequestParam(required = false) Integer month,
                                                @RequestParam(required = false) Integer day) {
        LocalDateTime startDate;
        LocalDateTime endDate;
        if (year == null && month == null && day == null) {
            LocalDateTime now = LocalDateTime.now();
            startDate = now.withDayOfMonth(1).with(LocalTime.MIN);
            endDate = now.with(TemporalAdjusters.lastDayOfMonth()).with(LocalTime.MAX);
        } else {
            if (year == null) {
                year = LocalDate.now().getYear();
            }
            if (month == null) {
                if (day != null) {
                    throw new MessageException("Month parameter is required if day parameter is provided",
                            ErrorConstants.INVALID_DATA_CODE);
                }
                startDate = LocalDateTime.of(year, 1, 1, 0, 0);
                endDate = LocalDateTime.of(year, 12, 31, 23, 59, 59, 999999999);
            } else {
                if (day == null) {
                    startDate = LocalDateTime.of(year, month, 1, 0, 0);
                    endDate = LocalDateTime.of(year, month, 1, 23, 59, 59, 999999999)
                            .with(TemporalAdjusters.lastDayOfMonth());
                } else {
                    startDate = LocalDateTime.of(year, month, day, 0, 0);
                    endDate = LocalDateTime.of(year, month, day, 23, 59, 59, 999999999);
                }
            }
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
