package com.dt.behuuchiencar.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TemplateContractInput {
    @NotNull
    private Long id;

    @NotBlank
    private String name;
    
    @Size(min = 10, max = 10, message = "Phone number must be exactly 10 characters")
    @Pattern(regexp = "^(\\+\\d{1,3}[- ]?)?\\d{10}$", message = "Invalid phone number")
    private String phone;

    @NotBlank
    private String address;

    @NotBlank
    private String signatureImage;

    @NotNull
    private int prepay;

    @NotNull
    private Long maximumDistance;

    @NotNull
    private int surcharge;
}
