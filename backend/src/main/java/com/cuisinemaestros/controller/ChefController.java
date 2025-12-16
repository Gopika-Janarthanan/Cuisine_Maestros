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

    @PostMapping("/search")
    @SuppressWarnings("null")
    public ResponseEntity<List<Chef>> searchChefs(@RequestBody com.cuisinemaestros.dto.ChefSearchRequest request) {
        // Simple in-memory filtering for demonstration (in real app use DB
        // query/Specifications)
        List<Chef> allChefs = chefRepository.findAll();

        List<Chef> filtered = allChefs.stream()
                .filter(chef -> {
                    boolean matchesQuery = request.getQuery() == null || request.getQuery().isEmpty() ||
                            chef.getUser().getName().toLowerCase().contains(request.getQuery().toLowerCase()) ||
                            chef.getSpecialty().toLowerCase().contains(request.getQuery().toLowerCase());

                    boolean matchesCuisine = request.getCuisine() == null || request.getCuisine().equals("All Cuisines")
                            ||
                            chef.getCuisines().stream().anyMatch(c -> c.equalsIgnoreCase(request.getCuisine()));

                    boolean matchesGender = request.getGender() == null || request.getGender().equals("All") ||
                            (chef.getGender() != null && chef.getGender().equalsIgnoreCase(request.getGender()));

                    // Note: Ignoring location and price strictly for now to keep it simple,
                    // but this is where you'd add that logic.

                    return matchesQuery && matchesCuisine && matchesGender;
                })
                .toList();

        return ResponseEntity.ok(filtered);
    }
}
