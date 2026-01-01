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

import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@SuppressWarnings("null")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private com.cuisinemaestros.repository.MessageRepository messageRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<Payment> createPayment(@RequestBody PaymentRequest request) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // If already paid, just return the existing payment
        if (booking.getStatus() == BookingStatus.PAID) {
            return paymentRepository.findByBookingId(booking.getId())
                    .map(ResponseEntity::ok)
                    .orElseThrow(() -> new RuntimeException("Booking marked as PAID but no payment record found"));
        }

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

        // Send Notifications via Messages
        try {
            // 1. Send confirmation to User
            com.cuisinemaestros.entity.Message userMsg = new com.cuisinemaestros.entity.Message();
            userMsg.setSenderId(0L); // System User ID
            userMsg.setReceiverId(booking.getUser().getId());
            userMsg.setBooking(booking);
            userMsg.setContent("Payment of ₹" + booking.getTotalAmount() + " for Booking #" + booking.getId()
                    + " has been confirmed. Thank you!");
            messageRepository.save(userMsg);

            // 2. Send notification to Chef
            com.cuisinemaestros.entity.Message chefMsg = new com.cuisinemaestros.entity.Message();
            chefMsg.setSenderId(0L); // System User ID
            chefMsg.setReceiverId(booking.getChef().getUser().getId());
            chefMsg.setBooking(booking);
            chefMsg.setContent("Good news! User " + booking.getUser().getName() + " has completed the payment of ₹"
                    + booking.getTotalAmount() + " for Booking #" + booking.getId() + ".");
            messageRepository.save(chefMsg);
        } catch (Exception e) {
            // Log error but don't fail payment if messaging fails
            System.err.println("Failed to send payment notifications: " + e.getMessage());
        }

        return ResponseEntity.ok(savedPayment);
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<Payment> getPaymentByBooking(@PathVariable Long bookingId) {
        return paymentRepository.findByBookingId(bookingId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
