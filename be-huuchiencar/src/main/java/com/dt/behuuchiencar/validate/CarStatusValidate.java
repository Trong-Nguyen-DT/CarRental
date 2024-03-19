package com.dt.behuuchiencar.validate;

import java.util.Arrays;

import com.dt.behuuchiencar.constant.ErrorConstants;
import com.dt.behuuchiencar.entity.CarEntity.CarStatus;
import com.dt.behuuchiencar.exception.MessageException;

public class CarStatusValidate {
    
    public static String validateStatusCar(String status) {
        String uppercaseStatus = status.toUpperCase();
        
        if (Arrays.stream(CarStatus.values()).anyMatch(enumVal -> enumVal.name().equals(uppercaseStatus))) {
            return uppercaseStatus;
        } else {
            throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
        }
    }
}
