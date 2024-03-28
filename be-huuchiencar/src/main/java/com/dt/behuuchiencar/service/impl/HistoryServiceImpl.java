package com.dt.behuuchiencar.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.behuuchiencar.convertor.HistoryConvertor;
import com.dt.behuuchiencar.entity.HistoryEntity;
import com.dt.behuuchiencar.model.response.HistoryResponse;
import com.dt.behuuchiencar.repository.HistoryRepository;
import com.dt.behuuchiencar.service.HistoryService;

@Service
public class HistoryServiceImpl implements HistoryService {
    
    @Autowired
    private HistoryRepository historyRepository;

    @Override
    public List<Object> getAllHistory() {
        return HistoryConvertor
            .convertToObjects(historyRepository
                                .findByOrderByDateTimeDesc()
                                .stream()
                                .map(HistoryConvertor::toModel)
                                .toList());
    }

    @Override
    public Object getAllHistoryByCar(Long carId) {
        HistoryResponse historyResponse = new HistoryResponse();
        List<HistoryEntity> historyEntities = historyRepository.findByCarId(carId);
        Long revenue = historyEntities.stream()
                                  .mapToLong(HistoryEntity::getTotalRevenue)
                                  .sum();
        historyResponse.setHistories(historyEntities.stream()
                                                    .map(HistoryConvertor::toModel)
                                                    .toList());
        historyResponse.setRevenue(revenue);
        return historyResponse;
    }

    @Override
    public Object getAllHistoryByCustomer(Long customerId) {
        HistoryResponse historyResponse = new HistoryResponse();
        List<HistoryEntity> historyEntities = historyRepository.findByCustomerId(customerId);
        Long revenue = historyEntities.stream()
                                    .mapToLong(HistoryEntity::getTotalRevenue)
                                    .sum();
        
        historyResponse.setHistories(historyEntities.stream()
                                                    .map(HistoryConvertor::toModel)
                                                    .toList());
        historyResponse.setRevenue(revenue);
        
        return historyResponse;
    }
}
