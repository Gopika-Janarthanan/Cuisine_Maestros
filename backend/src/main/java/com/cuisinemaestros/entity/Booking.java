package com.cuisinemaestros.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "chef_id", nullable = false)
    private Chef chef;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @Column(name = "booking_date", nullable = false)
    private LocalDate date;

    @Column(name = "booking_time", nullable = false)
    private LocalTime time;

    private Integer guests;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.PENDING;

    @Enumerated(EnumType.STRING)
    private GroceryOption groceryOption;

    // Costs - populated by Chef upon Acceptance
    private BigDecimal cookingCharge;
    private BigDecimal groceryCost; // Only if groceryOption is CHEF_PROVIDED
    private BigDecimal totalAmount;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
