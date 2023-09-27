-- Creación de la base de datos "DataBase_Disenart"
CREATE DATABASE DataBase_Disenart;

-- Creación de la tabla "colours"
CREATE TABLE colours (
    id_colour INT PRIMARY KEY auto_increment,
    colour VARCHAR(255) NOT NULL
);

-- Creación de la tabla "sizes"
CREATE TABLE sizes (
    id_size INT PRIMARY KEY auto_increment,
    size VARCHAR(255) NOT NULL
);

-- Creación de la tabla "productsData"
CREATE TABLE products_data (
    id_product INT PRIMARY KEY auto_increment,
    name_product VARCHAR(100) NOT NULL,
    colour_id INT,
    size_id INT,
    price_product DECIMAL(10, 2),
    quantity_product INT,
    description_product TEXT,
    image_product VARCHAR(255),
      FOREIGN KEY (colour_id) REFERENCES colours(id_colour),
    FOREIGN KEY (size_id) REFERENCES sizes(id_size)
);


-- Creación de la tabla "usersCategories"
CREATE TABLE users_categories (
    id_category INT PRIMARY KEY auto_increment,
    category VARCHAR(255)
);

-- Creación de la tabla "users"
CREATE TABLE users (
   id_user VARCHAR(255) PRIMARY KEY,
   name_user VARCHAR(100),
    lastname_user VARCHAR(100),
    email_user VARCHAR(255) UNIQUE NOT NULL,
    password_user VARCHAR(100) NOT NULL,
    bdate_user DATE,
    image_user VARCHAR(255),
    category_id INT DEFAULT 1,
    FOREIGN KEY (category_id) REFERENCES users_categories (id_category)
);

-- Creación de la tabla "shoppingCart"
CREATE TABLE shopping_cart (
    id_shopping INT PRIMARY KEY auto_increment,
    user_id VARCHAR(255),
    quantity_shop INT,
    tprice_shop DECIMAL(10, 2),
     FOREIGN KEY (user_id) REFERENCES users (id_user)
);

-- Creación de la tabla "productSales"
CREATE TABLE product_sales (
    id_productSale INT PRIMARY KEY auto_increment,
    shopping_id INT ,
    product_id INT,
    quantity_sale INT,
    colour_id INT,
    size_id INT,
      FOREIGN KEY (shopping_id) REFERENCES shopping_cart(id_shopping),
    FOREIGN KEY (product_id) REFERENCES products_data(id_product),
    FOREIGN KEY (colour_id) REFERENCES colours(id_colour),
    FOREIGN KEY (size_id) REFERENCES sizes(id_size)
);


