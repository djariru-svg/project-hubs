-- Table ya Orders (Igurisha rusange)
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'completed',
    payment_method VARCHAR(50) DEFAULT 'mock_payment',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table ya Order Items (Projects zaguzwe muri buri order)
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    project_id INT NOT NULL,
    seller_id INT NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Kongera column muri projects table kugira ngo tumene niba yaguzwe
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS is_sold BOOLEAN DEFAULT FALSE;

-- Kongera column kugira ngo tumene nyir'umushinga (seller_id is already there, but let's verify)
-- Niba seller_id itariho muri projects table, shaka iyi:
-- ALTER TABLE projects ADD COLUMN seller_id INT NOT NULL;
-- ALTER TABLE projects ADD FOREIGN KEY (seller_id) REFERENCES users(id);