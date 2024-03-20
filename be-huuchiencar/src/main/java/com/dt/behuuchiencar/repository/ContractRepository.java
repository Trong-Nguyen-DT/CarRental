package com.dt.behuuchiencar.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.behuuchiencar.entity.ContractEntity;

@Repository
public interface ContractRepository extends JpaRepository<ContractEntity, Long>{
}
