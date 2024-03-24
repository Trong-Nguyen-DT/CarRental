package com.dt.behuuchiencar.model;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Information {

    private Long id;
    @NotNull
    private Customer customer;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate expectedDate;
    private Long originalOdo;
    private Long endedOdo;
    private Long surcharge;
    private Long totalPrice;
}
