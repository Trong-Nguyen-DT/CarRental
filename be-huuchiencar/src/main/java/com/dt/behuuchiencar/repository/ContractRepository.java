package com.dt.behuuchiencar.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.behuuchiencar.entity.ContractEntity;
import com.dt.behuuchiencar.entity.CustomerEntity;

@Repository
public interface ContractRepository extends JpaRepository<ContractEntity, Long>{
    List<ContractEntity> findByCustomerEntity(CustomerEntity customerEntity);
}
