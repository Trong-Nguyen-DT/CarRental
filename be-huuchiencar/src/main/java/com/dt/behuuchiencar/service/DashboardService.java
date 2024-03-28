package com.dt.behuuchiencar.service;

import java.time.LocalDateTime;

import com.dt.behuuchiencar.model.response.DashboardResponse;

public interface DashboardService {

    DashboardResponse getInfoDashboard(LocalDateTime startDate, LocalDateTime endDate);
    
}
