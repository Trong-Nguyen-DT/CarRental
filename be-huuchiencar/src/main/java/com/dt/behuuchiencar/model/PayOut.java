package com.dt.behuuchiencar.model;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PayOut {
    private Long id;
    private Long carId;
    private String carName;
    private String nameService;
    private LocalDate payDate;
    private Long totalPay;
}
