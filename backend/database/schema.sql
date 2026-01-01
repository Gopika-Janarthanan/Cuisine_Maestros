CREATE DATABASE IF NOT EXISTS chef_connect;
USE chef_connect;
-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('USER', 'CHEF', 'ADMIN') NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Chefs Table
CREATE TABLE IF NOT EXISTS chefs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    specialty VARCHAR(255),
    bio TEXT,
    image_url VARCHAR(500),
    price_per_hour DECIMAL(10, 2),
    location VARCHAR(255),
    available BOOLEAN DEFAULT TRUE,
    rating DECIMAL(3, 2) DEFAULT 5.0,
    review_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Chef Cuisines (Many-to-Many)
CREATE TABLE IF NOT EXISTS chef_cuisines (
    chef_id BIGINT NOT NULL,
    cuisine VARCHAR(100) NOT NULL,
    PRIMARY KEY (chef_id, cuisine),
    FOREIGN KEY (chef_id) REFERENCES chefs(id) ON DELETE CASCADE
);
-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    chef_id BIGINT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    guests INT NOT NULL,
    notes TEXT,
    status ENUM(
        'PENDING',
        'CONFIRMED',
        'PAID',
        'COMPLETED',
        'CANCELLED'
    ) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (chef_id) REFERENCES chefs(id)
);
-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (
        rating BETWEEN 1 AND 5
    ),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);
-- Initial Data Seeding
INSERT INTO users (name, email, password_hash, role)
VALUES (
        'Admin User',
        'admin@example.com',
        '$2a$10$DummyHashForDemo',
        'ADMIN'
    ),
    (
        'Chef Alessandro',
        'alessandro@example.com',
        '$2a$10$DummyHashForDemo',
        'CHEF'
    ),
    (
        'User John',
        'john@example.com',
        '$2a$10$DummyHashForDemo',
        'USER'
    );
INSERT INTO chefs (
        user_id,
        specialty,
        bio,
        image_url,
        price_per_hour,
        location
    )
VALUES (
        2,
        'Michelin-trained Italian',
        'Expert in Italian cuisine with 15 years experience.',
        'https://images.unsplash.com/photo-1577219491135-ce391730fb2c',
        85.00,
        'New York, NY'
    );
INSERT INTO chef_cuisines (chef_id, cuisine)
VALUES (1, 'Italian'),
    (1, 'Mediterranean');