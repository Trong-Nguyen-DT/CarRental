package com.dt.behuuchiencar.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "contracts")
public class ContractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    private LocalDate signDate;

    private Long customerId;

    private String customerName;

    private String customerPhone;

    private String customerCitizenId;

    private Long userId;

    private String userName;

    private Long carId;

    private String carNumberPlate;

    private String carName;

    private Long rentCostCar;

    private LocalDate startDate;    

    private LocalDate endDate;

    private Long prePay;

    private Long endPay;
    
    private String signatureImageCustomer;

    @ManyToOne
    @JoinColumn(name = "template_contract_id")
    private TemplateContractEntity templateContractEntity;
}
