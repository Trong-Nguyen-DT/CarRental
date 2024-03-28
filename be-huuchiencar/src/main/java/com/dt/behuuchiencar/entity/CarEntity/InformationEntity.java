package com.dt.behuuchiencar.entity.CarEntity;

import java.time.LocalDateTime;

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

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private Long originalOdo;

    private Long endedOdo;

    private Long carCost;

    private Long surcharge;

    private Long totalPrice;
}
