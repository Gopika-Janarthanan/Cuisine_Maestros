package com.cuisinemaestros.controller;

import com.cuisinemaestros.dto.UserUpdateDTO;
import com.cuisinemaestros.entity.User;
import com.cuisinemaestros.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PutMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserUpdateDTO request) {
        return userRepository.findById(id)
                .map(user -> {
                    if (request.getName() != null)
                        user.setName(request.getName());
                    if (request.getImageUrl() != null)
                        user.setImageUrl(request.getImageUrl());
                    return ResponseEntity.ok(userRepository.save(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
