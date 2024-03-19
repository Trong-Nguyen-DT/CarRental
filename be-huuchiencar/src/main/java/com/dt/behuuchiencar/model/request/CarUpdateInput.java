package com.dt.behuuchiencar.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarUpdateInput {
    @NotNull
    private Long id;
    @NotBlank
    private String numberPlate;
    @NotBlank
    private String name;
    @NotNull
    private Long rentCost;

}
