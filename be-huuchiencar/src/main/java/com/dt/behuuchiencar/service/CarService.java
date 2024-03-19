package com.dt.behuuchiencar.service;

import java.util.List;

import com.dt.behuuchiencar.model.Car;
import com.dt.behuuchiencar.model.request.CarInput;
import com.dt.behuuchiencar.model.request.CarStatusInput;
import com.dt.behuuchiencar.model.request.CarUpdateInput;

public interface CarService {

    List<Object> getAllCar();

    Car createCar(CarInput carInput);

    Car updateCar(CarUpdateInput car);

    Car updateStatusCar(CarStatusInput input);

    Car deleteCar(Long carId);
    
}
