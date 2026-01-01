package com.cuisinemaestros.entity;

public enum BookingStatus {
    PENDING, // Created by User
    CONFIRMED, // Accepted by Chef (Price set)
    REJECTED, // Rejected by Chef
    PAID, // Payment made by User
    COMPLETED, // Service done
    CANCELLED // Cancelled by User/Chef
}
