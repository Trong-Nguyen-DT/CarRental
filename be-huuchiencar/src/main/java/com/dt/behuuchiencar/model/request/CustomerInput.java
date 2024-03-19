package com.dt.behuuchiencar.model.request;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerInput {
    
    @NotBlank
    private String name;
    
    @Size(min = 10, max = 10, message = "Số điện thoại phải có 10 kí tự")
    @Pattern(regexp = "^(\\+\\d{1,3}[- ]?)?\\d{10}$", message = "Số điện thoại không đúng định dạng")
    private String phone;

    @NotBlank
    @Size(min = 12, max = 12, message = "Căn cước công dân không chính xác")
    private String citizenId;

    @NotNull
    private MultipartFile citizenIdFront;

    @NotNull
    private MultipartFile citizenIdBack;

    @NotNull
    private MultipartFile driverLicenseFront;

    @NotNull
    private MultipartFile driverLicenseBack;
}
