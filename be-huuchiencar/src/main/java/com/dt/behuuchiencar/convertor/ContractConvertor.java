package com.dt.behuuchiencar.convertor;

import java.util.ArrayList;
import java.util.List;

import com.dt.behuuchiencar.entity.ContractEntity;
import com.dt.behuuchiencar.model.Contract;

public class ContractConvertor {
    
    public static Contract toModel(ContractEntity entity) {
        Contract contract = new Contract();
        contract.setId(entity.getId());
        contract.setSignDate(entity.getSignDate());
        contract.setStartDate(entity.getStartDate());
        contract.setEndDate(entity.getEndDate());
        contract.setPrePay(entity.getPrePay());
        contract.setCustomerId(entity.getCustomerId());
        contract.setCustomerName(entity.getCustomerName());
        contract.setCustomerPhone(entity.getCustomerPhone());
        contract.setCustomerCitizenId(entity.getCustomerCitizenId());
        contract.setUserId(entity.getUserId());
        contract.setUserName(entity.getUserName());
        contract.setCarId(entity.getCarId());
        contract.setCarNumberPlate(entity.getCarNumberPlate());
        contract.setCarName(entity.getCarName());
        contract.setRentCostCar(entity.getRentCostCar());
        contract.setSignatureImageCustomer(entity.getSignatureImageCustomer());
        contract.setCarImage(entity.getCarImage());
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
