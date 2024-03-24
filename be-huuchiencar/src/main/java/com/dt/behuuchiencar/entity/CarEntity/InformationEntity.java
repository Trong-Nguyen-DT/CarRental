package com.dt.behuuchiencar.entity.CarEntity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "informations")
public class InformationEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long customerId;

    private LocalDate startDate;

    private LocalDate endDate;

    private LocalDate expectedDate;

    private Long originalOdo;

    private Long endedOdo;

    private Long surcharge;

    private Long totalPrice;
}
