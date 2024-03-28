package com.dt.behuuchiencar.service;

import java.time.LocalDate;

import com.dt.behuuchiencar.model.response.DashboardResponse;

public interface DashboardService {

    DashboardResponse getInfoDashboard(LocalDate startDate, LocalDate endDate);
    
}
