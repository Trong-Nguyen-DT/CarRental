package com.dt.behuuchiencar.convertor;

import java.util.ArrayList;
import java.util.List;

import com.dt.behuuchiencar.entity.CustomerEntity;
import com.dt.behuuchiencar.model.Customer;

public class CustomerConvertor {
    
    public static Customer toModel(CustomerEntity entity) {
        Customer customer = new Customer();
        customer.setId(entity.getId());
        customer.setName(entity.getName());
        customer.setPhone(entity.getPhone());
        customer.setCitizenId(entity.getCitizenId());
        customer.setCitizenIdFront(entity.getCitizenIdFront());
        customer.setCitizenIdBack(entity.getCitizenIdBack());
        customer.setDriverLicenseFront(entity.getDriverLicenseFront());
        customer.setDriverLicenseBack(entity.getDriverLicenseBack());
        return customer;
    }

    public static List<Object> convertToObjects(List<Customer> customers) {
        List<Object> objects = new ArrayList<>();
        for (Customer customer : customers) {
            objects.add(customer);
        }
        return objects;
    }
}
