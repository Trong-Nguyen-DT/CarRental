package com.dt.behuuchiencar.model.request;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContractInput {
    private Long customerId;
    
    private Long carId;

    private LocalDate startDate;

    private LocalDate endDate;

}
