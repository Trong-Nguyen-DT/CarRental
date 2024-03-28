package com.dt.behuuchiencar.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.behuuchiencar.entity.PayOutEntity;

@Repository
public interface PayOutRepository extends JpaRepository<PayOutEntity, Long>{
    List<PayOutEntity> findByOrderByPayDateDesc();

    List<PayOutEntity> findByPayDateBetweenOrderByPayDateDesc(LocalDateTime startDate, LocalDateTime endDate);
}
