package com.dt.behuuchiencar.convertor;

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
}
