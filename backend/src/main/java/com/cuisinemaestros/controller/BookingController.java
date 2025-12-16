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

    @GetMapping("/chef/{chefId}")
    public java.util.List<Booking> getBookingsByChef(@PathVariable Long chefId) {
        return bookingRepository.findByChefId(chefId);
    }

    @PutMapping("/{id}/status")
    @SuppressWarnings("null")
    public org.springframework.http.ResponseEntity<Booking> updateStatus(@PathVariable Long id,
            @RequestBody java.util.Map<String, String> statusUpdate) {
        return bookingRepository.findById(id)
                .map(booking -> {
                    booking.setStatus(Booking.Status.valueOf(statusUpdate.get("status")));
                    return org.springframework.http.ResponseEntity.ok(bookingRepository.save(booking));
                })
                .orElse(org.springframework.http.ResponseEntity.notFound().build());
    }
}
