package com.cuisinemaestros.dto;

import com.cuisinemaestros.entity.User.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role; // USER or CHEF
}
