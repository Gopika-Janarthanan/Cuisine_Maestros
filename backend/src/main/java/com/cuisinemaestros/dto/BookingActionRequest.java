package com.cuisinemaestros.dto;

import lombok.Data;
import java.math.BigDecimal;
import com.cuisinemaestros.entity.BookingStatus;

@Data
public class BookingActionRequest {
    private BookingStatus status; // CONFIRMED or REJECTED
    private BigDecimal cookingCharge;
    private BigDecimal groceryCost; // Optional, only if chef provided or requested
}
