package com.cuisinemaestros.controller;

import com.cuisinemaestros.dto.AuthResponse;
import com.cuisinemaestros.dto.LoginRequest;
import com.cuisinemaestros.dto.RegisterRequest;
import com.cuisinemaestros.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private com.cuisinemaestros.repository.UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @GetMapping("/me")
    @SuppressWarnings("null")
    public ResponseEntity<com.cuisinemaestros.entity.User> getMe(@RequestHeader("Authorization") String token) {
        if (token != null && token.startsWith("Bearer dummy-jwt-token-")) {
            try {
                Long userId = Long.parseLong(token.substring("Bearer dummy-jwt-token-".length()));
                return userRepository.findById(userId)
                        .map(ResponseEntity::ok)
                        .orElse(ResponseEntity.status(401).build());
            } catch (Exception e) {
                return ResponseEntity.status(401).build();
            }
        }
        return ResponseEntity.status(401).build();
    }
}
