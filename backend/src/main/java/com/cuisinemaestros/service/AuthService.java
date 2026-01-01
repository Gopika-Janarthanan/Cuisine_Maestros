package com.cuisinemaestros.service;

import com.cuisinemaestros.dto.AuthResponse;
import com.cuisinemaestros.dto.LoginRequest;
import com.cuisinemaestros.dto.RegisterRequest;
import com.cuisinemaestros.entity.Chef;
import com.cuisinemaestros.entity.User;
import com.cuisinemaestros.repository.ChefRepository;
import com.cuisinemaestros.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChefRepository chefRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest request) {
        // Simplified login logic (no real hashing/JWT for demo simplicity unless
        // requested)
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) { // Use BCrypt for prod and dev
                                                                                      // consistently
                Long chefId = null;
                if (user.getRole() == User.Role.CHEF) {
                    chefId = chefRepository.findByUserId(user.getId()).map(Chef::getId).orElse(null);
                }
                return new AuthResponse("dummy-jwt-token-" + user.getId(), user.getName(), user.getRole().name(),
                        user.getId(), chefId);
            }
        }
        throw new RuntimeException("Invalid credentials");
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user = userRepository.save(user);

        Long chefId = null;

        if (request.getRole() == User.Role.CHEF) {
            Chef chef = new Chef();
            chef.setUser(user);
            chef.setBio("Professional Chef ready to serve.");
            chef.setLocation("Unknown");
            chef = chefRepository.save(chef);
            chefId = chef.getId();
        }

        return new AuthResponse("dummy-jwt-token-" + user.getId(), user.getName(), user.getRole().name(), user.getId(),
                chefId);
    }
}
