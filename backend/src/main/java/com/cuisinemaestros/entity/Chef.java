package com.cuisinemaestros.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "chefs")
@Data
@NoArgsConstructor
public class Chef {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String specialty;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "price_per_hour")
    private BigDecimal pricePerHour;

    private String location;

    private Boolean available = true;

    private BigDecimal rating = BigDecimal.valueOf(5.0);

    @Column(name = "review_count")
    private Integer reviewCount = 0;

    @ElementCollection
    @CollectionTable(name = "chef_cuisines", joinColumns = @JoinColumn(name = "chef_id"))
    @Column(name = "cuisine")
    private List<String> cuisines;

    private String gender;

    private String experience;

    @ElementCollection
    @CollectionTable(name = "chef_specialties", joinColumns = @JoinColumn(name = "chef_id"))
    @Column(name = "specialty")
    private List<String> specialties;

    public String getName() {
        return user != null ? user.getName() : null;
    }

    public String getEmail() {
        return user != null ? user.getEmail() : null;
    }

    public String getImage() {
        return imageUrl;
    }
}
