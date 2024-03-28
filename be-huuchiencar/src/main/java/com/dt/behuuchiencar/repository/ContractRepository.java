package com.dt.behuuchiencar.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.behuuchiencar.entity.ContractEntity;

@Repository
public interface ContractRepository extends JpaRepository<ContractEntity, Long>{

    List<ContractEntity> findAllByOrderBySignDateDesc();

    List<ContractEntity> findBySignDateBetween(LocalDate startDate, LocalDate endDate);
}
