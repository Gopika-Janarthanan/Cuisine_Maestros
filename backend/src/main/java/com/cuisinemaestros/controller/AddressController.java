package com.cuisinemaestros.controller;

import com.cuisinemaestros.dto.AddressDTO;
import com.cuisinemaestros.entity.Address;
import com.cuisinemaestros.entity.User;
import com.cuisinemaestros.repository.AddressRepository;
import com.cuisinemaestros.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@SuppressWarnings("null")
public class AddressController {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Address> addAddress(@RequestBody AddressDTO request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address address = new Address();
        address.setUser(user);
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setZipCode(request.getZipCode());
        address.setIsDefault(request.getIsDefault());

        return ResponseEntity.ok(addressRepository.save(address));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Address>> getUserAddresses(@PathVariable Long userId) {
        return ResponseEntity.ok(addressRepository.findByUserId(userId));
    }
}
