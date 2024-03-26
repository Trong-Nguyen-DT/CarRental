package com.dt.behuuchiencar.model;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Contract {
    private Long id;
    private LocalDate signDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long prePay;
    private Long customerId;
    private String customerName;
    private String customerPhone;
    private String customerCitizenId;
    private Long userId;
    private String userName;
    private Long carId;
    private String carNumberPlate;
    private String carName;
    private String carImage;
    private Long rentCostCar;
    private String signatureImageCustomer;
    private TemplateContract templateContract;
}
