package com.cuisinemaestros.controller;

import com.cuisinemaestros.dto.MessageDTO;
import com.cuisinemaestros.entity.Booking;
import com.cuisinemaestros.entity.Message;
import com.cuisinemaestros.repository.BookingRepository;
import com.cuisinemaestros.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/messages")
@SuppressWarnings("null")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody MessageDTO request) {
        Message message = new Message();
        message.setSenderId(request.getSenderId());
        message.setReceiverId(request.getReceiverId());
        message.setContent(request.getContent());

        if (request.getBookingId() != null) {
            Booking booking = bookingRepository.findById(request.getBookingId()).orElse(null);
            message.setBooking(booking);
        }

        return ResponseEntity.ok(messageRepository.save(message));
    }

    @GetMapping("/conversation")
    public ResponseEntity<List<MessageDTO>> getConversation(
            @RequestParam Long user1,
            @RequestParam Long user2) {
        List<Message> messages = messageRepository.findConversation(user1, user2);

        List<MessageDTO> dtos = messages.stream().map(m -> {
            MessageDTO dto = new MessageDTO();
            dto.setId(m.getId());
            dto.setSenderId(m.getSenderId());
            dto.setReceiverId(m.getReceiverId());
            dto.setContent(m.getContent());
            dto.setSentAt(m.getSentAt());
            if (m.getBooking() != null)
                dto.setBookingId(m.getBooking().getId());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }
}
