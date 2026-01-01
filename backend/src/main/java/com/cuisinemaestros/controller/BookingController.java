package com.cuisinemaestros.controller;

import com.cuisinemaestros.dto.BookingActionRequest;
import com.cuisinemaestros.dto.BookingRequest;
import com.cuisinemaestros.entity.Address;
import com.cuisinemaestros.entity.Booking;
import com.cuisinemaestros.entity.BookingStatus;
import com.cuisinemaestros.entity.GroceryOption;
import com.cuisinemaestros.entity.Chef;
import com.cuisinemaestros.entity.User;
import com.cuisinemaestros.repository.AddressRepository;
import com.cuisinemaestros.repository.BookingRepository;
import com.cuisinemaestros.repository.ChefRepository;
import com.cuisinemaestros.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@SuppressWarnings("null")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChefRepository chefRepository;

    @Autowired
    private AddressRepository addressRepository;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Chef chef = chefRepository.findById(request.getChefId())
                .orElseThrow(() -> new RuntimeException("Chef not found"));
        Address address = addressRepository.findById(request.getAddressId())
                .orElseThrow(() -> new RuntimeException("Address not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setChef(chef);
        booking.setAddress(address);
        booking.setDate(request.getDate());
        booking.setTime(request.getTime());
        booking.setGuests(request.getGuests());
        booking.setNotes(request.getNotes());
        booking.setGroceryOption(request.getGroceryOption());
        booking.setStatus(BookingStatus.PENDING);

        return ResponseEntity.ok(bookingRepository.save(booking));
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<Booking> chefConfirmBooking(@PathVariable Long id,
            @RequestBody BookingActionRequest request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (request.getStatus() == BookingStatus.CONFIRMED) {
            booking.setStatus(BookingStatus.CONFIRMED);
            booking.setCookingCharge(request.getCookingCharge());

            BigDecimal total = request.getCookingCharge();

            if (booking.getGroceryOption() == GroceryOption.CHEF_PROVIDED) {
                if (request.getGroceryCost() == null) {
                    throw new RuntimeException("Grocery cost must be provided when optional is CHEF_PROVIDED");
                }
                booking.setGroceryCost(request.getGroceryCost());
                total = total.add(request.getGroceryCost());
            } else {
                booking.setGroceryCost(BigDecimal.ZERO);
            }
            booking.setTotalAmount(total);
        } else if (request.getStatus() == BookingStatus.REJECTED) {
            booking.setStatus(BookingStatus.REJECTED);
        }

        return ResponseEntity.ok(bookingRepository.save(booking));
    }

    @GetMapping("/chef/{chefId}")
    public List<Booking> getBookingsByChef(@PathVariable Long chefId) {
        return bookingRepository.findByChefId(chefId);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Booking> updateStatus(@PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        return bookingRepository.findById(id)
                .map(booking -> {
                    booking.setStatus(BookingStatus.valueOf(statusUpdate.get("status")));
                    return ResponseEntity.ok(bookingRepository.save(booking));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
