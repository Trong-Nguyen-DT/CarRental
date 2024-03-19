package com.dt.behuuchiencar.entity.CarEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    @NotNull
    private Boolean deleted;
}
