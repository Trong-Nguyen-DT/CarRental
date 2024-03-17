package com.dt.behuuchiencar.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginInput {

    @NotBlank
    private String username;

    @NotBlank
    private String password;
    
}
