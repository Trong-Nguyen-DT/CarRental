package com.dt.behuuchiencar.model.request;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarInput {

    private Long id;

    @NotBlank
    private String numberPlate;

    @NotBlank
    private String name;

    @NotNull
    private Long odo;

    @NotNull
    private Long rentCost;

    @NotNull
    private MultipartFile image;    
}
