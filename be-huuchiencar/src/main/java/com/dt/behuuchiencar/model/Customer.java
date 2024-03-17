package com.dt.behuuchiencar.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Customer {
    private Long id;
    private String name;
    private String phone;
    private String citizenId;
    private String citizenIdFront;
    private String citizenIdBack;
    private String driverLicenseFront;
    private String driverLicenseBack;
}
