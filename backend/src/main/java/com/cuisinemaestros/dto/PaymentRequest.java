package com.cuisinemaestros.dto;

import com.cuisinemaestros.entity.Payment;
import lombok.Data;

@Data
public class PaymentRequest {
    private Long bookingId;
    private Payment.PaymentMethod method;
    // For mockup purposes, we might just simulate card details
    private String cardNumber; // Optional
}
