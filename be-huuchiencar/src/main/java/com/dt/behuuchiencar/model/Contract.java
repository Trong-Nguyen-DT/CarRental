package com.dt.behuuchiencar.model;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Contract {
    private LocalDate signDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long originalOdo;
    private Long prePay;
    private Long provisional;
    private Long surcharge;
    private Long totalPrice;
    private Customer customer;
    private User user;
    private Car car;
    private TemplateContract templateContract;
}
