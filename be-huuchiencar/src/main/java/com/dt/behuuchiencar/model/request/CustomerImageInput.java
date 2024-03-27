package com.dt.behuuchiencar.model.request;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerImageInput {
    @NotNull(message = "id khách hàng không được trống")
    private Long id;
    private MultipartFile citizenIdFront;
    private MultipartFile citizenIdBack;
    private MultipartFile driverLicenseFront;
    private MultipartFile driverLicenseBack;
}
