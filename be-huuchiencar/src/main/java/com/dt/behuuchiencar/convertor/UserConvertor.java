package com.dt.behuuchiencar.convertor;

import com.dt.behuuchiencar.entity.UserEntity.UserEntity;
import com.dt.behuuchiencar.model.User;
import com.dt.behuuchiencar.security.userprincal.UserPrinciple;

public class UserConvertor {
    

    public static User userPrincipleToModel(UserPrinciple principle) {
        User user = new User();
        user.setId(principle.getId());
        user.setUsername(principle.getUsername());
        user.setRole(principle.getRole());
        user.setName(principle.getName());
        if (principle.getPhone() != null) {
            user.setPhone(principle.getPhone());
        }
        if (principle.getAddress() != null) {
            user.setAddress(principle.getAddress());
        }
        return user;
    }

    public static User toModel(UserEntity entity) {
        User user = new User();
        user.setId(entity.getId());
        user.setName(entity.getName());
        user.setAddress(entity.getAddress());
        user.setPhone(entity.getPhone());
        user.setUsername(entity.getUsername());
        user.setRole(entity.getRole());
        return user;
    }
}
