package com.dt.behuuchiencar.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.behuuchiencar.entity.HistoryEntity;

@Repository
public interface HistoryRepository extends JpaRepository<HistoryEntity, Long>{
    List<HistoryEntity> findByDateTimeBetweenOrderByDateTimeDesc(LocalDateTime startDate, LocalDateTime endDate);

    List<HistoryEntity> findByOrderByDateTimeDesc();

    List<HistoryEntity> findByCarId(Long carId);

    List<HistoryEntity> findByCustomerId(Long customerId);


    
}
