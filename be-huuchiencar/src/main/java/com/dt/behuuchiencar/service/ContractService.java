package com.dt.behuuchiencar.service;

import java.util.List;

import com.dt.behuuchiencar.entity.TemplateContractEntity;
import com.dt.behuuchiencar.model.Contract;
import com.dt.behuuchiencar.model.request.ContractInput;

public interface ContractService {

    TemplateContractEntity getTemplateContract(Long id);

    List<Object> getAllContract();

    Contract createContract(ContractInput input);
    
}
