package com.dt.behuuchiencar.entity;

import java.time.LocalDate;

import com.dt.behuuchiencar.entity.CarEntity.CarEntity;
import com.dt.behuuchiencar.entity.UserEntity.UserEntity;

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

    @NotNull
    private LocalDate startDate;

    private LocalDate endDate;

    @NotNull
    private Long originalOdo;

    @NotNull
    private Long prePay;

    private Long provisional;

    private Long surcharge;

    private Long totalPrice;

    @NotNull
    private String status;
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private CustomerEntity customerEntity;

    private Long idCustomer;

    private String nameCustomer;

    private String phoneCustomer;

    private String citizenId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    private Long idUser;

    private String nameUser;

    private String phoneUser;

    private String addressUser;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private CarEntity carEntity;

    private Long idCar;

    private String numberPlateCar;

    private String nameCar;

    private String rentCostCar;

    @ManyToOne
    @JoinColumn(name = "template_contract_id")
    private TemplateContractEntity templateContractEntity;

    
}
