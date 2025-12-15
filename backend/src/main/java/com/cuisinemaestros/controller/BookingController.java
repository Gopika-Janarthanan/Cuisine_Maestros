package com.cuisinemaestros.controller;

import com.cuisinemaestros.entity.Booking;
import com.cuisinemaestros.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping
    @SuppressWarnings("null")
    public Booking createBooking(@RequestBody Booking booking) {
        // Simplified: assuming request contains valid IDs and simple mapping
        // In prod, use DTOs to map user/chef IDs to entities
        return bookingRepository.save(booking);
    }
}
