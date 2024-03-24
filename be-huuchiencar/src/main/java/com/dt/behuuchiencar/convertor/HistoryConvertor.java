package com.dt.behuuchiencar.convertor;

import java.util.ArrayList;
import java.util.List;

import com.dt.behuuchiencar.entity.HistoryEntity;
import com.dt.behuuchiencar.model.History;

public class HistoryConvertor {
    
    public static History toModel(HistoryEntity entity) {
        History history = new History();
        history.setId(entity.getId());
        history.setCustomerId(entity.getCustomerId());
        history.setCustomerName(entity.getCustomerName());
        history.setUserId(entity.getUserId());
        history.setUserName(entity.getUserName());
        history.setCarId(entity.getCarId());
        history.setCarName(entity.getCarName());
        history.setTotalRevenue(entity.getTotalRevenue());
        history.setDateTime(entity.getDateTime());
        if (entity.getContractId() != null) {
            history.setContractId(entity.getContractId());
        }
        return history;
    }

    public static List<Object> convertToObjects(List<History> histories) {
        List<Object> objects = new ArrayList<>();
        for (History history : histories) {
            objects.add(history);
        }
        return objects;
    }
}
