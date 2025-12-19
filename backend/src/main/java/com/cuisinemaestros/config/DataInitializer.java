package com.cuisinemaestros.config;

import com.cuisinemaestros.entity.Chef;
import com.cuisinemaestros.entity.User;
import com.cuisinemaestros.repository.ChefRepository;
import com.cuisinemaestros.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChefRepository chefRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // Seed User 1 (Chef Sanjeev)
            User user1 = new User();
            user1.setName("Chef Sanjeev Kumar");
            user1.setEmail("sanjeev@example.com");
            user1.setPassword(passwordEncoder.encode("password"));
            user1.setRole("CHEF");
            userRepository.save(user1);

            Chef chef1 = new Chef();
            chef1.setUser(user1);
            chef1.setSpecialty("Master of Awadhi & Mughlai Cuisine");
            chef1.setCuisines(Arrays.asList("Mughlai", "North Indian"));
            chef1.setPricePerHour(new BigDecimal("2500"));
            chef1.setLocation("New Delhi, Delhi");
            chef1.setGender("Male");
            chef1.setAvailable(true);
            chef1.setReviewCount(215);
            chef1.setRating(new BigDecimal("4.9"));
            chefRepository.save(chef1);

            // Seed User 2 (Chef Anjali)
            User user2 = new User();
            user2.setName("Chef Anjali Menon");
            user2.setEmail("anjali@example.com");
            user2.setPassword(passwordEncoder.encode("password"));
            user2.setRole("CHEF");
            userRepository.save(user2);

            Chef chef2 = new Chef();
            chef2.setUser(user2);
            chef2.setSpecialty("Authentic South Indian Coastal Flavors");
            chef2.setCuisines(Arrays.asList("South Indian", "Kerala"));
            chef2.setPricePerHour(new BigDecimal("2000"));
            chef2.setLocation("Kochi, Kerala");
            chef2.setGender("Female");
            chef2.setAvailable(true);
            chef2.setReviewCount(142);
            chef2.setRating(new BigDecimal("4.8"));
            chefRepository.save(chef2);

            System.out.println("Database seeded with sample chefs.");
        }
    }
}
