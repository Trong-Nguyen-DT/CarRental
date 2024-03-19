package com.dt.behuuchiencar.convertor;

import java.util.ArrayList;
import java.util.List;

import com.dt.behuuchiencar.entity.CarEntity.CarEntity;
import com.dt.behuuchiencar.model.Car;

public class CarConvertor {
    
    public static Car toModel(CarEntity entity) {
        Car car = new Car();
        car.setId(entity.getId());
        car.setNumberPlate(entity.getNumberPlate());
        car.setName(entity.getName());
        car.setStatus(entity.getStatus());
        car.setOdo(entity.getOdo());
        car.setRentCost(entity.getRentCost());
        car.setImage(entity.getImage());
        car.setRevenue(entity.getRevenue());
        return car;
    }

    public static List<Object> convertToObjects(List<Car> cars) {
        List<Object> objects = new ArrayList<>();
        for (Car car : cars) {
            objects.add(car);
        }
        return objects;
    }
}
