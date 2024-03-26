package com.dt.behuuchiencar.service;

import java.util.List;

public interface HistoryService {

    List<Object> getAllHistory();

    Object getAllHistoryByCar(Long carId);

    Object getAllHistoryByCustomer(Long customerId);
    
}
