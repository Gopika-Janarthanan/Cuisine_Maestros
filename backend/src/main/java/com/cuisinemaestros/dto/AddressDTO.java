package com.cuisinemaestros.dto;

import lombok.Data;

@Data
public class AddressDTO {
    private Long userId;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private Boolean isDefault;
}
