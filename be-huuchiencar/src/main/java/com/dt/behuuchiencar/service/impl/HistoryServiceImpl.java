package com.dt.behuuchiencar.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.behuuchiencar.convertor.HistoryConvertor;
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
                                .findAll()
                                .stream()
                                .map(HistoryConvertor::toModel)
                                .toList());
    }
    
}
