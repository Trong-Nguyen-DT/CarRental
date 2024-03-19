package com.dt.behuuchiencar.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Customer {

    @NotNull
    private Long id;
    private String name;

    @Size(min = 10, max = 10, message = "Số điện thoại phải có 10 kí tự")
    @Pattern(regexp = "^(\\+\\d{1,3}[- ]?)?\\d{10}$", message = "Số điện thoại không đúng định dạng")
    private String phone;
    private String citizenId;
    private String citizenIdFront;
    private String citizenIdBack;
    private String driverLicenseFront;
    private String driverLicenseBack;
}
