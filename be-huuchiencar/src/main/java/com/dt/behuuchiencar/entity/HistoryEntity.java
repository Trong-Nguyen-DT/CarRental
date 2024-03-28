package com.dt.behuuchiencar.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "histories")
public class HistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long customerId;

    private String customerName;

    private Long userId;

    private String userName;

    private Long carId;

    private String carName;

    private Long contractId;

    private Long surcharge;

    private Long carCost;

    private Long totalRevenue;

    private LocalDateTime dateTime;
    
}
