package com.dt.behuuchiencar.service;

import java.util.List;

import com.dt.behuuchiencar.model.Customer;
import com.dt.behuuchiencar.model.request.CustomerInput;

public interface CustomerService {

    List<Object> getAllCustomer();

    Customer createCustomer(CustomerInput customerInput);

    Customer updateCustomer(Customer customer);

    Customer deleteCustomer(Long customerId);
    
}
