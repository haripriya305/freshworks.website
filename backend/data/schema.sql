-- ===========================================================
--  FreshWorks — MySQL schema
--  Run with: mysql -u root -p freshworks < data/schema.sql
--  (create the database first: CREATE DATABASE freshworks;)
-- ===========================================================

CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  password      VARCHAR(255) NOT NULL,
  role          ENUM('agent', 'admin') NOT NULL DEFAULT 'agent',
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS blog_posts (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  slug          VARCHAR(150) NOT NULL UNIQUE,
  title         VARCHAR(255) NOT NULL,
  excerpt       TEXT NOT NULL,
  body          LONGTEXT,
  tag           VARCHAR(50) DEFAULT 'General',
  author        VARCHAR(100) DEFAULT 'FreshWorks Team',
  post_date     DATE DEFAULT (CURRENT_DATE),
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS contact_messages (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL,
  subject       VARCHAR(200) NOT NULL,
  message       TEXT NOT NULL,
  status        ENUM('new', 'read', 'archived') NOT NULL DEFAULT 'new',
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS tickets (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  customer      VARCHAR(100) NOT NULL,
  subject       VARCHAR(200) NOT NULL,
  status        ENUM('Open', 'In progress', 'Urgent', 'Resolved') NOT NULL DEFAULT 'Open',
  assigned_to   INT NULL,
  channel       ENUM('email', 'chat', 'social') NOT NULL DEFAULT 'email',
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;
