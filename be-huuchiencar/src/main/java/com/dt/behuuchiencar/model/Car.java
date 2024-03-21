package com.dt.behuuchiencar.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Car {
    
    @NotNull
    private Long id;

    @NotBlank
    private String numberPlate;

    @NotBlank
    private String name;    

    private String status;

    private Long odo;

    @NotNull
    private Long rentCost;

    private String image;

    private Long revenue;

    private Customer customer;
}
