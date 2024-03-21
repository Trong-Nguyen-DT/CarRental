package com.dt.behuuchiencar.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.behuuchiencar.constant.ErrorConstants;
import com.dt.behuuchiencar.convertor.CarConvertor;
import com.dt.behuuchiencar.convertor.CustomerConvertor;
import com.dt.behuuchiencar.entity.CustomerEntity;
import com.dt.behuuchiencar.entity.CarEntity.CarEntity;
import com.dt.behuuchiencar.entity.CarEntity.CarStatus;
import com.dt.behuuchiencar.exception.MessageException;
import com.dt.behuuchiencar.model.Car;
import com.dt.behuuchiencar.model.request.CarInput;
import com.dt.behuuchiencar.model.request.CarStatusInput;
import com.dt.behuuchiencar.model.request.CarUpdateInput;
import com.dt.behuuchiencar.repository.CarRepository;
import com.dt.behuuchiencar.repository.CustomerRepository;
import com.dt.behuuchiencar.service.CarService;
import com.dt.behuuchiencar.validate.CarStatusValidate;

@Service
public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public List<Object> getAllCar() {
        return CarConvertor.convertToObjects(
                carRepository.findAllByDeletedFalseOrderByIdDesc()
                        .stream()
                        .map(carEntity -> {
                            Car car = CarConvertor.toModel(carEntity);
                            if (carEntity.getCustomerId() != null) {
                                CustomerEntity customer = customerRepository.findById(carEntity.getCustomerId())
                                        .orElseThrow(() -> new MessageException(
                                                ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
                                car.setCustomer(CustomerConvertor.toModel(customer));
                            }
                            return car;
                        })
                        .toList());
    }

    @Override
    public Car createCar(CarInput carInput) {
        CarEntity entity = new CarEntity();
        entity.setNumberPlate(carInput.getNumberPlate());
        entity.setName(carInput.getName());
        entity.setStatus(CarStatus.INACTIVE.name());
        entity.setOdo(carInput.getOdo());
        entity.setRentCost(carInput.getRentCost());
        entity.setImage(imageService.uploadImage(carInput.getImage()));
        entity.setRevenue(0L);
        entity.setDeleted(false);
        return CarConvertor.toModel(carRepository.save(entity));
    }

    @Override
    public Car updateCar(CarUpdateInput car) {
        CarEntity entity = getCarById(car.getId());
        entity.setNumberPlate(car.getNumberPlate());
        entity.setName(entity.getName());
        entity.setRentCost(entity.getRentCost());
        return CarConvertor.toModel(carRepository.save(entity));
    }

    @Override
    public Car updateStatusCar(CarStatusInput input) {
        CarEntity entity = getCarById(input.getId());
        entity.setStatus(CarStatusValidate.validateStatusCar(input.getStatus()));
        return CarConvertor.toModel(carRepository.save(entity));
    }

    @Override
    public Car deleteCar(Long carId) {
        CarEntity entity = getCarById(carId);
        entity.setDeleted(true);
        return CarConvertor.toModel(carRepository.save(entity));
    }

    private CarEntity getCarById(Long id) {
        return carRepository.findById(id).orElseThrow(
                () -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
    }
}
