package com.dt.behuuchiencar.model.request;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PayoutInput {

    private Long carId;
    private String nameService;
    private Long price;
    private LocalDate date;
}
