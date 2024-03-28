package com.dt.behuuchiencar.model.request;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PayoutInput {

    private Long carId;
    private String nameService;
    private Long price;
    private LocalDateTime date;
}
