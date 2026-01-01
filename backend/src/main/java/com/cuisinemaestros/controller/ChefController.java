package com.cuisinemaestros.controller;

import com.cuisinemaestros.entity.Chef;
import com.cuisinemaestros.repository.ChefRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chefs")
@SuppressWarnings("null")
public class ChefController {

    @Autowired
    private ChefRepository chefRepository;

    @GetMapping
    public List<Chef> getAllChefs() {
        return chefRepository.findAll();
    }

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
        List<Chef> allChefs = chefRepository.findAll();

        java.util.stream.Stream<Chef> stream = allChefs.stream();

        // Filtering
        stream = stream.filter(chef -> {
            boolean matchesQuery = request.getQuery() == null || request.getQuery().isEmpty() ||
                    chef.getUser().getName().toLowerCase().contains(request.getQuery().toLowerCase()) ||
                    chef.getSpecialty().toLowerCase().contains(request.getQuery().toLowerCase());

            boolean matchesCuisine = request.getCuisine() == null || request.getCuisine().equals("All Cuisines") ||
                    chef.getCuisines().stream().anyMatch(c -> c.equalsIgnoreCase(request.getCuisine()));

            boolean matchesGender = request.getGender() == null || request.getGender().equals("All") ||
                    (chef.getGender() != null && chef.getGender().equalsIgnoreCase(request.getGender()));

            boolean matchesLocation = request.getLocation() == null || request.getLocation().isEmpty() ||
                    (chef.getLocation() != null
                            && chef.getLocation().toLowerCase().contains(request.getLocation().toLowerCase()));

            boolean matchesMinPrice = request.getMinPrice() == null ||
                    (chef.getPricePerHour() != null && chef.getPricePerHour().doubleValue() >= request.getMinPrice());

            boolean matchesMaxPrice = request.getMaxPrice() == null ||
                    (chef.getPricePerHour() != null && chef.getPricePerHour().doubleValue() <= request.getMaxPrice());

            return matchesQuery && matchesCuisine && matchesGender && matchesLocation && matchesMinPrice
                    && matchesMaxPrice;
        });

        // Sorting
        if (request.getSortBy() != null) {
            switch (request.getSortBy()) {
                case "price-low":
                    stream = stream.sorted((c1, c2) -> c1.getPricePerHour().compareTo(c2.getPricePerHour()));
                    break;
                case "price-high":
                    stream = stream.sorted((c1, c2) -> c2.getPricePerHour().compareTo(c1.getPricePerHour()));
                    break;
                case "reviews":
                    stream = stream.sorted((c1, c2) -> c2.getReviewCount().compareTo(c1.getReviewCount()));
                    break;
                case "rating":
                default:
                    stream = stream.sorted((c1, c2) -> c2.getRating().compareTo(c1.getRating()));
                    break;
            }
        }

        List<Chef> filtered = stream.toList();
        return ResponseEntity.ok(filtered);
    }

    @PutMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<Chef> updateChef(@PathVariable Long id,
            @RequestBody com.cuisinemaestros.dto.ChefUpdateDTO request) {
        return chefRepository.findById(id)
                .map(chef -> {
                    if (request.getPricePerHour() != null)
                        chef.setPricePerHour(request.getPricePerHour());
                    if (request.getSpecialty() != null)
                        chef.setSpecialty(request.getSpecialty());
                    if (request.getBio() != null)
                        chef.setBio(request.getBio());
                    if (request.getLocation() != null)
                        chef.setLocation(request.getLocation());
                    if (request.getExperience() != null)
                        chef.setExperience(request.getExperience());
                    if (request.getCuisines() != null)
                        chef.setCuisines(request.getCuisines());
                    if (request.getSpecialties() != null)
                        chef.setSpecialties(request.getSpecialties());
                    if (request.getAvailable() != null)
                        chef.setAvailable(request.getAvailable());
                    if (request.getImage() != null)
                        chef.setImageUrl(request.getImage());
                    return ResponseEntity.ok(chefRepository.save(chef));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
