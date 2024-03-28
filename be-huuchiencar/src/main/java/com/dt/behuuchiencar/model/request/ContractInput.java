package com.dt.behuuchiencar.model.request;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContractInput {

    @NotNull(message = "Không có khách hàng cho hợp đồng")
    private Long customerId;
    
    @NotNull(message = "Không có xe cho hợp đồng")
    private Long carId;

    @NotNull(message = "Không có ngày bắt đầu thuê xe")     
    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private MultipartFile signatureImageCustomer;
}
