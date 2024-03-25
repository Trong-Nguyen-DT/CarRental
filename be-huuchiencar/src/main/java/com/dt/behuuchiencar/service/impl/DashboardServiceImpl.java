package com.dt.behuuchiencar.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.behuuchiencar.constant.ErrorConstants;
import com.dt.behuuchiencar.convertor.CarConvertor;
import com.dt.behuuchiencar.entity.HistoryEntity;
import com.dt.behuuchiencar.entity.CarEntity.CarEntity;
import com.dt.behuuchiencar.exception.MessageException;
import com.dt.behuuchiencar.model.Car;
import com.dt.behuuchiencar.model.response.DashboardResponse;
import com.dt.behuuchiencar.repository.CarRepository;
import com.dt.behuuchiencar.repository.HistoryRepository;
import com.dt.behuuchiencar.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @Override
    public DashboardResponse getInfoDashboard(LocalDate startDate, LocalDate endDate) {
        DashboardResponse response = new DashboardResponse();
        List<HistoryEntity> historyEntities = historyRepository.findByDateTimeBetweenOrderByDateTimeDesc(startDate, endDate);

        List<CarEntity> allCars = carRepository.findAllByDeletedFalseOrderByIdDesc();

        Map<Long, CarEntity> carEntityMap = allCars.stream()
                .collect(Collectors.toMap(CarEntity::getId, Function.identity()));

        Map<Long, Long> revenueByVehicle = new HashMap<>();
        Long totalRevenue = 0L;
        for (HistoryEntity history : historyEntities) {
            Long vehicleId = history.getCarId();
            revenueByVehicle.merge(vehicleId, history.getTotalRevenue(), Long::sum);
            totalRevenue += history.getTotalRevenue();
        }

        List<Car> cars = new ArrayList<>();
        for (Map.Entry<Long, CarEntity> entry : carEntityMap.entrySet()) {
            Long carId = entry.getKey();
            CarEntity carEntity = entry.getValue();
            Long revenue = revenueByVehicle.getOrDefault(carId, 0L);
            Car car = CarConvertor.toModel(carEntity);
            car.setRevenue(revenue);
            cars.add(car);
        }
        response.setCars(cars);
        response.setRevenue(totalRevenue);

        return response;
    }

}
