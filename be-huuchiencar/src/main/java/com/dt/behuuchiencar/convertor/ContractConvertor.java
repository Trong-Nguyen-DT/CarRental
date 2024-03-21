package com.dt.behuuchiencar.convertor;

import java.util.ArrayList;
import java.util.List;

import com.dt.behuuchiencar.entity.ContractEntity;
import com.dt.behuuchiencar.model.Contract;

public class ContractConvertor {
    
    public static Contract toModel(ContractEntity entity) {
        Contract contract = new Contract();
        contract.setSignDate(entity.getSignDate());
        contract.setStartDate(entity.getStartDate());
        contract.setEndDate(entity.getEndDate());
        contract.setOriginalOdo(entity.getOriginalOdo());
        contract.setPrePay(entity.getPrePay());
        contract.setCustomer(CustomerConvertor.toModel(entity.getCustomerEntity()));
        contract.setUser(UserConvertor.toModel(entity.getUserEntity()));
        contract.setCar(CarConvertor.toModel(entity.getCarEntity()));
        contract.setTemplateContract(TemplateConvertor.toModel(entity.getTemplateContractEntity()));
        return contract;
    }

    public static List<Object> convertToObjects(List<Contract> contracts) {
        List<Object> objects = new ArrayList<>();
        for (Contract contract : contracts) {
            objects.add(contract);
        }
        return objects;
    }
}
