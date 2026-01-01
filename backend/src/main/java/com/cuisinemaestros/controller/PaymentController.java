package com.cuisinemaestros.controller;

import com.cuisinemaestros.dto.PaymentRequest;
import com.cuisinemaestros.entity.Booking;
import com.cuisinemaestros.entity.BookingStatus;
import com.cuisinemaestros.entity.Payment;
import com.cuisinemaestros.repository.BookingRepository;
import com.cuisinemaestros.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@SuppressWarnings("null")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping
    public ResponseEntity<Payment> createPayment(@RequestBody PaymentRequest request) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() != BookingStatus.CONFIRMED) {
            throw new RuntimeException("Booking must be CONFIRMED by chef before payment");
        }

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(booking.getTotalAmount());
        payment.setMethod(request.getMethod());
        payment.setStatus(Payment.PaymentStatus.PAID);
        payment.setTransactionId(UUID.randomUUID().toString()); // Mock transaction ID

        Payment savedPayment = paymentRepository.save(payment);

        // Update booking status
        booking.setStatus(BookingStatus.PAID);
        bookingRepository.save(booking);

        return ResponseEntity.ok(savedPayment);
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<Payment> getPaymentByBooking(@PathVariable Long bookingId) {
        return paymentRepository.findByBookingId(bookingId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
