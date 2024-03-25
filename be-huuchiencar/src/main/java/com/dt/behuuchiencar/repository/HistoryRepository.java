package com.dt.behuuchiencar.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.behuuchiencar.entity.HistoryEntity;

@Repository
public interface HistoryRepository extends JpaRepository<HistoryEntity, Long>{

    List<HistoryEntity> findByDateTimeBetweenOrderByDateTimeDesc(LocalDate startDate, LocalDate endDate);

    List<HistoryEntity> findByOrderByDateTimeDesc();


    
}
