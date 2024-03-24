package com.dt.behuuchiencar.model;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class History {
    private Long id;
    private Long customerId;
    private String customerName;
    private Long userId;
    private String userName;
    private Long carId;
    private String carName;
    private Long contractId;
    private Long totalRevenue;
    private LocalDate dateTime;
}
