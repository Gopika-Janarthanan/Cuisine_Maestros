package com.cuisinemaestros.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class ChefUpdateDTO {
    private BigDecimal pricePerHour;
    private String specialty;
    private String bio;
    private String location;
    private String experience;
    private List<String> specialties; // detailed list
    private List<String> cuisines;
    private Boolean available;
    private String image;
}
