package com.dt.behuuchiencar.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.behuuchiencar.convertor.CustomerConvertor;
import com.dt.behuuchiencar.repository.CustomerRepository;
import com.dt.behuuchiencar.service.CustomerService;

@Service
public class CustomerServiceImpl implements CustomerService{

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public List<Object> getAllCustomer() {
        return CustomerConvertor.convertToObjects(customerRepository
                .findByDeletedFalse()
                .stream()
                .map(CustomerConvertor::toModel)
                .toList());
    }
    
}
