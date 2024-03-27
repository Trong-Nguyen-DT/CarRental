package com.dt.behuuchiencar.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.behuuchiencar.constant.ErrorConstants;
import com.dt.behuuchiencar.convertor.PayOutConvertor;
import com.dt.behuuchiencar.entity.PayOutEntity;
import com.dt.behuuchiencar.entity.CarEntity.CarEntity;
import com.dt.behuuchiencar.exception.MessageException;
import com.dt.behuuchiencar.model.PayOut;
import com.dt.behuuchiencar.model.request.PayoutInput;
import com.dt.behuuchiencar.repository.CarRepository;
import com.dt.behuuchiencar.repository.PayOutRepository;
import com.dt.behuuchiencar.service.PayOutService;

@Service
public class PayOutServiceImpl implements PayOutService{

    @Autowired
    private PayOutRepository payOutRepository;

    @Autowired
    private CarRepository carRepository;

    @Override
    public List<Object> getAllPayOut() {
        return PayOutConvertor
            .convertToObjects(payOutRepository
                                .findByOrderByPayDateDesc()
                                .stream()
                                .map(PayOutConvertor::toModel)
                                .toList());
    }

    @Override
    public PayOut createPayout(PayoutInput input) {
        CarEntity car = carRepository.findById(input.getCarId()).orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
        PayOutEntity entity = new PayOutEntity();
        entity.setCarId(car.getId());
        entity.setCarName(car.getName());
        entity.setTotalPay(input.getPrice());
        entity.setNameService(input.getNameService());
        if (input.getDate() != null) {
            entity.setPayDate(input.getDate());
        } else {
            entity.setPayDate(LocalDate.now());
        }
        return PayOutConvertor.toModel(payOutRepository.save(entity));
    }
    
}
