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
            user1.setRole(User.Role.CHEF);
            userRepository.save(user1);

            Chef chef1 = new Chef();
            chef1.setUser(user1);
            chef1.setSpecialty("Master of Awadhi & Mughlai Cuisine");
            chef1.setCuisines(Arrays.asList("Mughlai", "North Indian"));
            chef1.setImageUrl(
                    "https://images.unsplash.com/photo-1577219491135-ce391730fbaf?auto=format&fit=crop&q=80&w=600");
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
            user2.setRole(User.Role.CHEF);
            userRepository.save(user2);

            Chef chef2 = new Chef();
            chef2.setUser(user2);
            chef2.setSpecialty("Authentic South Indian Coastal Flavors");
            chef2.setCuisines(Arrays.asList("South Indian", "Kerala"));
            chef2.setImageUrl(
                    "https://images.unsplash.com/photo-1583394238712-92d1ffdc7a2c?auto=format&fit=crop&q=80&w=600");
            chef2.setPricePerHour(new BigDecimal("2000"));
            chef2.setLocation("Kochi, Kerala");
            chef2.setGender("Female");
            chef2.setAvailable(true);
            chef2.setReviewCount(142);
            chef2.setRating(new BigDecimal("4.8"));
            chefRepository.save(chef2);

            // Seed User 3 (Chef Vikram)
            User user3 = new User();
            user3.setName("Chef Vikram Rathore");
            user3.setEmail("vikram@example.com");
            user3.setPassword(passwordEncoder.encode("password"));
            user3.setRole(User.Role.CHEF);
            userRepository.save(user3);

            Chef chef3 = new Chef();
            chef3.setUser(user3);
            chef3.setSpecialty("North Indian Tandoor Specialist");
            chef3.setCuisines(Arrays.asList("North Indian", "Tandoor"));
            chef3.setImageUrl(
                    "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=600");
            chef3.setPricePerHour(new BigDecimal("1800"));
            chef3.setLocation("Bangalore, Karnataka");
            chef3.setGender("Male");
            chef3.setAvailable(true);
            chef3.setReviewCount(89);
            chef3.setRating(new BigDecimal("4.5"));
            chefRepository.save(chef3);

            // Seed User 4 (Chef Priya)
            User user4 = new User();
            user4.setName("Chef Priya Sharma");
            user4.setEmail("priya@example.com");
            user4.setPassword(passwordEncoder.encode("password"));
            user4.setRole(User.Role.CHEF);
            userRepository.save(user4);

            Chef chef4 = new Chef();
            chef4.setUser(user4);
            chef4.setSpecialty("Authentic Italian & Continental Cuisine");
            chef4.setCuisines(Arrays.asList("Italian", "Continental"));
            chef4.setImageUrl(
                    "https://images.unsplash.com/photo-1595273670150-db0c3c392b3f?auto=format&fit=crop&q=80&w=600");
            chef4.setPricePerHour(new BigDecimal("3000"));
            chef4.setLocation("Mumbai, Maharashtra");
            chef4.setGender("Female");
            chef4.setAvailable(true);
            chef4.setReviewCount(156);
            chef4.setRating(new BigDecimal("4.7"));
            chefRepository.save(chef4);

            // Seed User 5 (Chef Rahul)
            User user5 = new User();
            user5.setName("Chef Rahul Verma");
            user5.setEmail("rahul@example.com");
            user5.setPassword(passwordEncoder.encode("password"));
            user5.setRole(User.Role.CHEF);
            userRepository.save(user5);

            Chef chef5 = new Chef();
            chef5.setUser(user5);
            chef5.setSpecialty("Indo-Chinese & Thai Street Food");
            chef5.setCuisines(Arrays.asList("Chinese", "Thai"));
            chef5.setImageUrl(
                    "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=600");
            chef5.setPricePerHour(new BigDecimal("1500"));
            chef5.setLocation("Hyderabad, Telangana");
            chef5.setGender("Male");
            chef5.setAvailable(true);
            chef5.setReviewCount(74);
            chef5.setRating(new BigDecimal("4.4"));
            chefRepository.save(chef5);

            // Seed User 6 (Chef Meera)
            User user6 = new User();
            user6.setName("Chef Meera Desai");
            user6.setEmail("meera@example.com");
            user6.setPassword(passwordEncoder.encode("password"));
            user6.setRole(User.Role.CHEF);
            userRepository.save(user6);

            Chef chef6 = new Chef();
            chef6.setUser(user6);
            chef6.setSpecialty("Traditional Gujarati & Rajasthani Thali");
            chef6.setCuisines(Arrays.asList("Gujarati", "Rajasthani"));
            chef6.setImageUrl(
                    "https://images.unsplash.com/photo-1654922248234-bab4b1988899?auto=format&fit=crop&q=80&w=600");
            chef6.setPricePerHour(new BigDecimal("1200"));
            chef6.setLocation("Ahmedabad, Gujarat");
            chef6.setGender("Female");
            chef6.setAvailable(true);
            chef6.setReviewCount(210);
            chef6.setRating(new BigDecimal("4.9"));
            chefRepository.save(chef6);

            System.out.println("Database seeded with additional sample chefs.");
        }
    }
}
