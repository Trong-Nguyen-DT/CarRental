package com.dt.behuuchiencar.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "template_contracts")
public class TemplateContractEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;
    
    @NotBlank
    private String phone;

    @NotBlank
    private String address;

    @NotBlank
    private String signatureImage;

    @NotNull
    private Long maximumDistance;

    @NotNull
    private int surcharge;
}
