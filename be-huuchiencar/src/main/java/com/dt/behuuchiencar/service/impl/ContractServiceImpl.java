package com.dt.behuuchiencar.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.dt.behuuchiencar.constant.ErrorConstants;
import com.dt.behuuchiencar.convertor.ContractConvertor;
import com.dt.behuuchiencar.entity.ContractEntity;
import com.dt.behuuchiencar.entity.CustomerEntity;
import com.dt.behuuchiencar.entity.TemplateContractEntity;
import com.dt.behuuchiencar.entity.CarEntity.CarEntity;
import com.dt.behuuchiencar.entity.UserEntity.UserEntity;
import com.dt.behuuchiencar.exception.MessageException;
import com.dt.behuuchiencar.model.Contract;
import com.dt.behuuchiencar.model.request.ContractInput;
import com.dt.behuuchiencar.repository.CarRepository;
import com.dt.behuuchiencar.repository.ContractRepository;
import com.dt.behuuchiencar.repository.CustomerRepository;
import com.dt.behuuchiencar.repository.TemplateContractRepository;
import com.dt.behuuchiencar.repository.UserRepository;
import com.dt.behuuchiencar.service.ContractService;

@Service
public class ContractServiceImpl implements ContractService{

    @Autowired
    private TemplateContractRepository templateContractRepository;

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageService imageService;

    @Override
    public TemplateContractEntity getTemplateContract() {
        return getTemplateContractEntity();
    }

    @Override
    public List<Object> getAllContract() {
        return ContractConvertor
                    .convertToObjects(
                        contractRepository
                            .findAllByOrderBySignDateDesc()
                            .stream()
                            .map(ContractConvertor::toModel)
                            .toList());
    }

    @Override
    public Contract createContract(ContractInput input) {
        ContractEntity entity = new ContractEntity();
        entity.setSignDate(LocalDate.now());
        CustomerEntity customer = getCustomerById(input.getCustomerId());
        entity.setCustomerId(customer.getId());
        entity.setCustomerName(customer.getName());
        entity.setCustomerPhone(customer.getPhone());
        entity.setCustomerCitizenId(customer.getCitizenId());
        UserEntity user = getUserEntity();
        entity.setUserId(user.getId());
        entity.setUserName(user.getName());
        CarEntity car = getCarById(input.getCarId());
        entity.setCarId(car.getId());
        entity.setCarNumberPlate(car.getNumberPlate());
        entity.setCarName(car.getName());
        entity.setRentCostCar(car.getRentCost());
        entity.setCarImage(car.getImage());
        entity.setStartDate(input.getStartDate());
        entity.setEndDate(input.getEndDate());
        entity.setPrePay(input.getPrePay());
        entity.setEndPay(input.getEndPay());
        entity.setSignatureImageCustomer(imageService.uploadImage(input.getSignatureImageCustomer()));
        entity.setTemplateContractEntity(getTemplateContract());
        return ContractConvertor.toModel(contractRepository.save(entity));
    }

    private CustomerEntity getCustomerById(Long customerId) {
        return customerRepository.findById(customerId).orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
    }

    private CarEntity getCarById(Long carId) {
        return carRepository.findById(carId).orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
    }

    private UserEntity getUserEntity() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new MessageException(ErrorConstants.UNAUTHORIZED_MESSAGE, ErrorConstants.UNAUTHORIZED_CODE);
        }
        return userRepository.findUserByUsernameAndDeletedFalse(authentication.getName()).orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
    }

    private TemplateContractEntity getTemplateContractEntity() {
        return templateContractRepository.findById(1L).orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
    }
}
