package com.dt.behuuchiencar.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.behuuchiencar.constant.ErrorConstants;
import com.dt.behuuchiencar.convertor.ContractConvertor;
import com.dt.behuuchiencar.entity.ContractEntity;
import com.dt.behuuchiencar.entity.TemplateContractEntity;
import com.dt.behuuchiencar.exception.MessageException;
import com.dt.behuuchiencar.model.Contract;
import com.dt.behuuchiencar.model.request.ContractInput;
import com.dt.behuuchiencar.repository.ContractRepository;
import com.dt.behuuchiencar.repository.CustomerRepository;
import com.dt.behuuchiencar.repository.TemplateContractRepository;
import com.dt.behuuchiencar.service.ContractService;

@Service
public class ContractServiceImpl implements ContractService{

    @Autowired
    private TemplateContractRepository templateContractRepository;

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public TemplateContractEntity getTemplateContract(Long id) {
        return templateContractRepository.findById(id)
            .orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
    }

    @Override
    public List<Object> getAllContract() {
        return ContractConvertor
                    .convertToObjects(
                        contractRepository
                            .findAll()
                            .stream()
                            .map(ContractConvertor::toModel)
                            .toList());
    }

    @Override
    public Contract createContract(ContractInput input) {
        ContractEntity entity = new ContractEntity();
        return ContractConvertor.toModel(contractRepository.save(entity));
    }

    @Override
    public List<Object> getAllContractByCustomer(Long customerId) {
        return ContractConvertor.convertToObjects(
                contractRepository.findByCustomerEntity(customerRepository
                .findById(customerId).orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE)))
                        .stream()
                        .map(ContractConvertor::toModel)
                        .toList());
    }

    
}
