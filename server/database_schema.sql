-- TRAVELOOP POSTGRESQL DATABASE SCHEMA
-- This file contains the complete relational structure for the Traveloop app.

-- 1. CITIES (Global Reference)
CREATE TABLE cities (
    city_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    cost_index INT CHECK (cost_index BETWEEN 1 AND 5),
    popularity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. USERS
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_photo_url TEXT,
    tier VARCHAR(20) DEFAULT 'SILVER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. TRIPS
CREATE TABLE trips (
    trip_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    start_date DATE,
    end_date DATE,
    description TEXT,
    cover_photo_url TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. STOPS (Within a Trip)
CREATE TABLE stops (
    stop_id SERIAL PRIMARY KEY,
    trip_id INT REFERENCES trips(trip_id) ON DELETE CASCADE,
    city_id INT REFERENCES cities(city_id),
    arrival_date DATE,
    departure_date DATE,
    position INT NOT NULL,
    UNIQUE(trip_id, position)
);

-- 5. ACTIVITIES (Global Reference)
CREATE TABLE activities (
    activity_id SERIAL PRIMARY KEY,
    city_id INT REFERENCES cities(city_id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(50),
    duration_minutes INT,
    estimated_cost DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. STOP_ACTIVITIES (Linking Activities to specific Stops)
CREATE TABLE stop_activities (
    stop_id INT REFERENCES stops(stop_id) ON DELETE CASCADE,
    activity_id INT REFERENCES activities(activity_id) ON DELETE CASCADE,
    scheduled_time TIME,
    notes TEXT,
    PRIMARY KEY (stop_id, activity_id)
);

-- 7. BUDGETS (Per Trip)
CREATE TABLE budgets (
    budget_id SERIAL PRIMARY KEY,
    trip_id INT UNIQUE REFERENCES trips(trip_id) ON DELETE CASCADE,
    transport_budget DECIMAL(12, 2) DEFAULT 0,
    accommodation_budget DECIMAL(12, 2) DEFAULT 0,
    activities_budget DECIMAL(12, 2) DEFAULT 0,
    meals_budget DECIMAL(12, 2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD'
);

-- 8. PACKING_ITEMS (Per Trip)
CREATE TABLE packing_items (
    item_id SERIAL PRIMARY KEY,
    trip_id INT REFERENCES trips(trip_id) ON DELETE CASCADE,
    item_name VARCHAR(150) NOT NULL,
    category VARCHAR(50),
    is_packed BOOLEAN DEFAULT FALSE
);

-- 9. NOTES (Contextual)
CREATE TABLE notes (
    note_id SERIAL PRIMARY KEY,
    trip_id INT REFERENCES trips(trip_id) ON DELETE CASCADE,
    stop_id INT REFERENCES stops(stop_id) ON DELETE SET NULL,
    title VARCHAR(200),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. SHARE_TOKENS
CREATE TABLE share_tokens (
    token_id SERIAL PRIMARY KEY,
    trip_id INT REFERENCES trips(trip_id) ON DELETE CASCADE,
    token VARCHAR(100) UNIQUE NOT NULL,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX idx_cities_name ON cities(name);
CREATE INDEX idx_trips_user_id ON trips(user_id);
CREATE INDEX idx_share_tokens_token ON share_tokens(token);
CREATE INDEX idx_stops_trip_pos ON stops(trip_id, position);
