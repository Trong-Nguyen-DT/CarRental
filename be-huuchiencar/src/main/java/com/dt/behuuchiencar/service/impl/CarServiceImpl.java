package com.dt.behuuchiencar.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.dt.behuuchiencar.constant.ErrorConstants;
import com.dt.behuuchiencar.convertor.CarConvertor;
import com.dt.behuuchiencar.convertor.CustomerConvertor;
import com.dt.behuuchiencar.convertor.InformationConvertor;
import com.dt.behuuchiencar.entity.CustomerEntity;
import com.dt.behuuchiencar.entity.HistoryEntity;
import com.dt.behuuchiencar.entity.CarEntity.CarEntity;
import com.dt.behuuchiencar.entity.CarEntity.CarStatus;
import com.dt.behuuchiencar.entity.CarEntity.InformationEntity;
import com.dt.behuuchiencar.entity.UserEntity.UserEntity;
import com.dt.behuuchiencar.exception.MessageException;
import com.dt.behuuchiencar.model.Car;
import com.dt.behuuchiencar.model.Customer;
import com.dt.behuuchiencar.model.Information;
import com.dt.behuuchiencar.model.request.CarInput;
import com.dt.behuuchiencar.model.request.CarStatusInput;
import com.dt.behuuchiencar.model.request.CarUpdateInput;
import com.dt.behuuchiencar.repository.CarRepository;
import com.dt.behuuchiencar.repository.CustomerRepository;
import com.dt.behuuchiencar.repository.HistoryRepository;
import com.dt.behuuchiencar.repository.InformationRepository;
import com.dt.behuuchiencar.repository.UserRepository;
import com.dt.behuuchiencar.service.CarService;
import com.dt.behuuchiencar.validate.CarStatusValidate;

@Service
public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private InformationRepository informationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @Override
    public List<Object> getAllCar() {
        return CarConvertor.convertToObjects(
                carRepository.findAllByDeletedFalseOrderByIdDesc()
                        .stream()
                        .map(carEntity -> {
                            Car car = CarConvertor.toModel(carEntity);
                            if (carEntity.getInformationId() != null) {
                                InformationEntity informationEntity = informationRepository.findById(carEntity.getInformationId())
                                        .orElseThrow(() -> new MessageException(
                                                ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
                                Information information = InformationConvertor.toModel(informationEntity);
                                information.setCustomer(getCustomer(informationEntity.getCustomerId()));
                                car.setInformation(information);
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
        entity.setName(car.getName());
        entity.setRentCost(car.getRentCost());
        return CarConvertor.toModel(carRepository.save(entity));
    }

    @Override
    public Car updateStatusCar(CarStatusInput input) {
        String status = input.getStatus().toUpperCase();
        Car car;
        switch (status) {
            case "BOOKED":
                car = updateStatusBooked(input);
                break;
            case "ACTIVE":
                car = updateStatusActive(input);
                break;
            case "INACTIVE":
                car = updateStatusInActive(input);
                break;
            default:
                throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
        }
        return car;

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

    private Car updateStatusBooked(CarStatusInput input) {
        CarEntity entity = getCarById(input.getId());
        if (input.getCustomerId() == null) {
            throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
        }
        entity.setStatus(CarStatusValidate.validateStatusCar(input.getStatus()));
        InformationEntity infoEntity = new InformationEntity();
        updateInformationEntity(infoEntity, input);
        infoEntity = informationRepository.save(infoEntity);
        entity.setInformationId(infoEntity.getId());
        entity = carRepository.save(entity);
        Car car = CarConvertor.toModel(entity);
        Information information = InformationConvertor.toModel(infoEntity);
        information.setCustomer(getCustomer(infoEntity.getCustomerId()));
        car.setInformation(information);
        return car;   
    }

    private Car updateStatusActive(CarStatusInput input) {
        CarEntity entity = getCarById(input.getId());
        if (input.getCustomerId() == null || input.getInfo() == null) {
            throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
        }
        entity.setStatus(CarStatusValidate.validateStatusCar(input.getStatus()));
        InformationEntity infoEntity = new InformationEntity();
        if (entity.getInformationId() != null) {
            infoEntity = informationRepository.findById(entity.getInformationId()).orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
        } 
        updateInformationEntity(infoEntity, input);
        infoEntity = informationRepository.save(infoEntity);
        entity.setInformationId(infoEntity.getId());
        entity = carRepository.save(entity);
        Car car = CarConvertor.toModel(entity);
        Information information = InformationConvertor.toModel(infoEntity);
        information.setCustomer(getCustomer(infoEntity.getCustomerId()));
        car.setInformation(information);
        return car;
    }

    private Car updateStatusInActive(CarStatusInput input) {
        CarEntity entity = getCarById(input.getId());
        if (entity.getStatus().equals("INACTIVE")) {
            throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
        }
        entity.setStatus(CarStatusValidate.validateStatusCar(input.getStatus()));
        if (input.getInfo() != null) {
            InformationEntity infoEntity = informationRepository.findById(entity.getInformationId()).orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
            updateInformationEntity(infoEntity, input);
            infoEntity = informationRepository.save(infoEntity);
            createHistory(input, infoEntity, entity);
        }
        entity.setInformationId(null);
        return CarConvertor.toModel(carRepository.save(entity));
    }

    private void updateInformationEntity(InformationEntity infoEntity, CarStatusInput input) {
        infoEntity.setCustomerId(input.getCustomerId());
        Information info = input.getInfo();
        if (info != null) {
            if (info.getStartDate() != null) {
                infoEntity.setStartDate(info.getStartDate());
            }
            if (info.getEndDate() != null) {
                infoEntity.setEndDate(info.getEndDate());
            }
            if (info.getCarCost() != null) {
                infoEntity.setCarCost(info.getCarCost());
            }
            if (info.getOriginalOdo() != null) {
                infoEntity.setOriginalOdo(info.getOriginalOdo());
            }
            if (info.getEndedOdo() != null) {
                infoEntity.setEndedOdo(info.getEndedOdo());
            }
            if (info.getSurcharge() != null) {
                infoEntity.setSurcharge(info.getSurcharge());
            }
            if (info.getTotalPrice() != null) {
                infoEntity.setTotalPrice(info.getTotalPrice());
            }
        }
    }

    private void createHistory(CarStatusInput input, InformationEntity info, CarEntity carEntity) {
        HistoryEntity entity = new HistoryEntity();
        UserEntity user = getUserEntity();
        entity.setUserId(user.getId());
        entity.setUserName(user.getName());
        CustomerEntity customer = customerRepository.findById(input.getCustomerId()).orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
        entity.setCustomerId(customer.getId());
        entity.setCustomerName(customer.getName());
        entity.setCarId(carEntity.getId());
        entity.setCarName(carEntity.getName());
        entity.setCarCost(info.getCarCost());
        entity.setSurcharge(0L);
        if (info.getSurcharge() != null) {
            entity.setSurcharge(info.getSurcharge());
        }
        entity.setTotalRevenue(info.getCarCost() + info.getSurcharge());
        entity.setDateTime(LocalDateTime.now());
        historyRepository.save(entity);
    }

    private UserEntity getUserEntity() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new MessageException(ErrorConstants.UNAUTHORIZED_MESSAGE, ErrorConstants.UNAUTHORIZED_CODE);
        }
        return userRepository.findUserByUsernameAndDeletedFalse(authentication.getName()).orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
    }

    private Customer getCustomer(Long customerId) {
        return CustomerConvertor.toModel(customerRepository.findById(customerId).orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE)));
    }
}
