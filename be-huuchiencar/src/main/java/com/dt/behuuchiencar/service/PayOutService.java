package com.dt.behuuchiencar.service;

import java.util.List;

import com.dt.behuuchiencar.model.PayOut;
import com.dt.behuuchiencar.model.request.PayoutInput;

public interface PayOutService {

    List<Object> getAllPayOut();

    PayOut createPayout(PayoutInput input);
    
}
