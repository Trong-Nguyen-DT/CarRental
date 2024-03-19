package com.dt.behuuchiencar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.behuuchiencar.entity.CarEntity.CarEntity;

@Repository
public interface CarRepository extends JpaRepository<CarEntity, Long>{

    List<CarEntity> findByDeletedFalse();
    
}
