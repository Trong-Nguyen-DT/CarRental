package com.dt.behuuchiencar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.behuuchiencar.entity.TemplateContractEntity;

@Repository
public interface TemplateContractRepository extends JpaRepository<TemplateContractEntity, Long>{
    
}
