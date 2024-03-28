package com.dt.behuuchiencar.model;

import java.time.LocalDateTime;

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
    private Long surcharge;
    private Long carCost;
    private Long totalRevenue;
    private LocalDateTime dateTime;
}
