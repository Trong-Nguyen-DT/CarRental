package com.dt.behuuchiencar.convertor;

import com.dt.behuuchiencar.entity.CarEntity.InformationEntity;
import com.dt.behuuchiencar.model.Information;

public class InformationConvertor {
    
    public static Information toModel(InformationEntity entity) {
        Information info = new Information();
        info.setId(entity.getId());
        info.setStartDate(entity.getStartDate());
        info.setEndDate(entity.getEndDate());
        info.setExpectedDate(entity.getExpectedDate());
        info.setOriginalOdo(entity.getOriginalOdo());
        info.setEndedOdo(entity.getEndedOdo());
        info.setSurcharge(entity.getSurcharge());
        info.setTotalPrice(entity.getTotalPrice());
        return info;
    }
}
