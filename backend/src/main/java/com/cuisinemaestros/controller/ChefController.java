package com.cuisinemaestros.controller;

import com.cuisinemaestros.entity.Chef;
import com.cuisinemaestros.repository.ChefRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chefs")
public class ChefController {

    @Autowired
    private ChefRepository chefRepository;

    @GetMapping("/featured")
    public List<Chef> getFeaturedChefs() {
        // In a real app, logic to pick "featured" chefs
        return chefRepository.findByAvailableTrue();
    }

    @GetMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<Chef> getChefById(@PathVariable Long id) {
        return chefRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
