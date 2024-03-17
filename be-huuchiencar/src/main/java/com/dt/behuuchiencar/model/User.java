package com.dt.behuuchiencar.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private Long id;
    private String username;
    private String name;
    private String phone;
    private String address;
    private String role;
}
