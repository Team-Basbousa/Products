DROP DATABASE IF EXISTS catwalk;

CREATE DATABASE catwalk;

USE catwalk;

DROP TABLE IF EXISTS styles;
DROP TABLE IF EXISTS sku;
DROP TABLE IF EXISTS productURL;
DROP TABLE IF EXISTS primary_info;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS related;

CREATE TABLE primary_info (
  productId INT NOT NULL AUTO_INCREMENT,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price INT,
  PRIMARY KEY (productId)
);

CREATE TABLE styles (
  style_id INT NOT NULL AUTO_INCREMENT,
  productId INT NOT NULL,
  name TEXT,
  sale_price INT,
  original_price INT,
  default_style INTEGER,
  PRIMARY KEY (style_id),
  FOREIGN KEY (productId) REFERENCES primary_info(productId)
);

CREATE TABLE sku (
  id INT NOT NULL AUTO_INCREMENT,
  style_id INT NOT NULL,
  quantity INT NOT NULL,
  size TEXT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (style_id) REFERENCES styles(style_id)
);

CREATE TABLE productURL (
  id INT NOT NULL AUTO_INCREMENT,
  style_id INT NOT NULL,
  thumbnail_url TEXT,
  image_url TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (style_id) REFERENCES styles(style_id)
);

CREATE TABLE features (
  id INT AUTO_INCREMENT,
  productId INT,
  feature TEXT,
  value TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES primary_info(productId)
);

CREATE TABLE related (
  id INT NOT NULL AUTO_INCREMENT,
  productId INT,
  related_product_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES primary_info(productId)
)