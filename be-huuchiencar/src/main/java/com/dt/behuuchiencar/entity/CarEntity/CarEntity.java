package com.dt.behuuchiencar.entity.CarEntity;

import java.util.List;

import com.dt.behuuchiencar.entity.ContractEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "cars", uniqueConstraints = {
    @UniqueConstraint(columnNames = {
            "numberPlate"
    })
})
public class CarEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String numberPlate;

    @NotBlank
    private String name;

    @NotNull
    private String status;

    @NotNull
    private Long odo;

    @NotNull
    private Long rentCost;

    @NotBlank
    private String image;

    @NotNull
    private Long revenue;

    private Long customerId;

    @NotNull
    private Boolean deleted;

    @OneToMany(mappedBy = "carEntity", cascade = CascadeType.ALL)
    private List<ContractEntity> contracts;
}
