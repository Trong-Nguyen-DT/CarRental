package com.dt.behuuchiencar.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.behuuchiencar.constant.ErrorConstants;
import com.dt.behuuchiencar.entity.TemplateContractEntity;
import com.dt.behuuchiencar.exception.MessageException;
import com.dt.behuuchiencar.repository.TemplateContractRepository;
import com.dt.behuuchiencar.service.ContractService;

@Service
public class ContractServiceImpl implements ContractService{

    @Autowired
    private TemplateContractRepository templateContractRepository;

    @Override
    public TemplateContractEntity getTemplateContract(Long id) {
        return templateContractRepository.findById(id)
            .orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
    }

    
}
