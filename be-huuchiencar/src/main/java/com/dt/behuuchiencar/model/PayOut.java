package com.dt.behuuchiencar.model;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PayOut {
    private Long id;
    private Long carId;
    private String carName;
    private String nameService;
    private LocalDateTime payDate;
    private Long totalPay;
}
