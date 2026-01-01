package com.cuisinemaestros.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;
import com.cuisinemaestros.entity.GroceryOption;

@Data
public class BookingRequest {
    private Long userId;
    private Long chefId;
    private Long addressId;
    private LocalDate date;
    private LocalTime time;
    private Integer guests;
    private String notes;
    private GroceryOption groceryOption;
}
