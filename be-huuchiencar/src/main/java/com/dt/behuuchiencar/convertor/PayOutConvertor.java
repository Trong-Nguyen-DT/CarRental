package com.dt.behuuchiencar.convertor;

import java.util.ArrayList;
import java.util.List;

import com.dt.behuuchiencar.entity.PayOutEntity;
import com.dt.behuuchiencar.model.PayOut;

public class PayOutConvertor {
    public static PayOut toModel(PayOutEntity entity) {
        PayOut payOut = new PayOut();
        payOut.setId(entity.getId());
        payOut.setCarId(entity.getCarId());
        payOut.setCarName(entity.getCarName());
        payOut.setNameService(entity.getNameService());
        payOut.setPayDate(entity.getPayDate());
        payOut.setTotalPay(entity.getTotalPay());
        return payOut;
    }

    public static List<Object> convertToObjects(List<PayOut> payouts) {
        List<Object> objects = new ArrayList<>();
        for (PayOut payout : payouts) {
            objects.add(payout);
        }
        return objects;
    }
}
