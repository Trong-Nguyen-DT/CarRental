package com.dt.behuuchiencar.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.behuuchiencar.entity.UserEntity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long>{

    Optional<UserEntity> findUserByUsernameAndDeletedFalse(String username);

    boolean existsByUsername(String username);
    
}
