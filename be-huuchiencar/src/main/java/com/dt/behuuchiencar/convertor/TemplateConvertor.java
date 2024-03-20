package com.dt.behuuchiencar.convertor;

import com.dt.behuuchiencar.entity.TemplateContractEntity;
import com.dt.behuuchiencar.model.TemplateContract;

public class TemplateConvertor {

    public static TemplateContract toModel(TemplateContractEntity entity) {
        TemplateContract templateContract = new TemplateContract();
        templateContract.setId(entity.getId());
        templateContract.setAddress(entity.getAddress());
        templateContract.setMaximumDistance(entity.getMaximumDistance());
        templateContract.setName(entity.getName());
        templateContract.setPhone(entity.getPhone());
        templateContract.setSignatureImage(entity.getSignatureImage());
        templateContract.setSurcharge(entity.getSurcharge());
        return templateContract;
    }
    
}
