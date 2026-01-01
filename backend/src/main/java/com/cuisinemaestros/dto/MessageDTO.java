package com.cuisinemaestros.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MessageDTO {
    private Long id;
    private Long senderId;
    private Long receiverId;
    private Long bookingId; // Optional
    private String content;
    private LocalDateTime sentAt;
}
