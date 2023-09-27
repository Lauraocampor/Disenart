-- Poblar la tabla "colours"
INSERT INTO colours (colour)
VALUES
  ('#000000'), -- Negro
  ('#FFFFFF'), -- Blanco
  ('#808080'), -- Gris
  ('#008000'), -- Verde
  ('#0000FF'); -- Azul

-- Poblar la tabla "sizes"
INSERT INTO sizes (size)
VALUES
  ('S'),
  ('M'),
  ('L'),
  ('XL'),
  ('No Aplica');
  
-- Poblar la tabla "products_data"
INSERT INTO products_data (id_product, name_product, colour_id, size_id, price_product, quantity_product, description_product, image_product)
VALUES
  (1, 'Remera', 1, 1, 3600, 25, 'Remera de algodón. Nuestro algodón, al ser cultivado orgánicamente, tiene una calidad y suavidad superior al algodón convencional, proporcionando una mayor comodidad y durabilidad en tus prendas. A su vez, cuenta con propiedades hipoalergénicas, evitando la exposición de tu piel a sustancias tóxicas. Añadí tu dibujo o imagen personalizada.', '{"1693188281114remera-h1.jpg", "1693188281119remera-h2.jpg", "1693188281123remera-m1.jpg", "1693188281126remera-m2.jpg"}'),
  (2, 'Remera', 1, 4, 3600, 15, 'Remera de algodón. Nuestro algodón, al ser cultivado orgánicamente, tiene una calidad y suavidad superior al algodón convencional, proporcionando una mayor comodidad y durabilidad en tus prendas. A su vez, cuenta con propiedades hipoalergénicas, evitando la exposición de tu piel a sustancias tóxicas. Añadí tu dibujo o imagen personalizada.', '{"1691687048870remera-m2.jpg", "1691687048858remera-h1.jpg", "1691687048863remera-h2.jpg", "1691687048867remera-m1.jpg"}'),
  (3, 'Remera', 2, 3, 3600, 30, 'Remera de algodón. Nuestro algodón, al ser cultivado orgánicamente, tiene una calidad y suavidad superior al algodón convencional, proporcionando una mayor comodidad y durabilidad en tus prendas. A su vez, cuenta con propiedades hipoalergénicas, evitando la exposición de tu piel a sustancias tóxicas. Añadí tu dibujo o imagen personalizada.', '{"1691687048867remera-m1.jpg", "1691687048858remera-h1.jpg", "1691687048863remera-h2.jpg", "1691687048870remera-m2.jpg"}'),
  (4, 'Remera', 3, 2, 3600, 18, 'Remera de algodón. Nuestro algodón, al ser cultivado orgánicamente, tiene una calidad y suavidad superior al algodón convencional, proporcionando una mayor comodidad y durabilidad en tus prendas. A su vez, cuenta con propiedades hipoalergénicas, evitando la exposición de tu piel a sustancias tóxicas. Añadí tu dibujo o imagen personalizada.', '{"1691687048863remera-h2.jpg", "1691687048858remera-h1.jpg", "1691687048867remera-m1.jpg", "1691687048870remera-m2.jpg"}'),
  (5, 'Buzo', 1, 3, 6000, 5, 'Buzo de algodón. Nuestro algodón, al ser cultivado orgánicamente, tiene una calidad y suavidad superior al algodón convencional, proporcionando una mayor comodidad y durabilidad en tus prendas. A su vez, cuenta con propiedades hipoalergénicas, evitando la exposición de tu piel a sustancias tóxicas. Añadí tu dibujo o imagen personalizada.', '{"1691687109361buzo4.jpg", "1691687109352buzo1.jpg", "1691687109358buzo3.jpg", "1691687109649buzo5.jpg"}'),
  (6, 'Buzo', 4, 2, 6000, 7, 'Buzo de algodón. Nuestro algodón, al ser cultivado orgánicamente, tiene una calidad y suavidad superior al algodón convencional, proporcionando una mayor comodidad y durabilidad en tus prendas. A su vez, cuenta con propiedades hipoalergénicas, evitando la exposición de tu piel a sustancias tóxicas. Añadí tu dibujo o imagen personalizada.', '{"1691687109352buzo1.jpg", "1691687109358buzo3.jpg", "1691687109361buzo4.jpg", "1691687109649buzo5.jpg"}'),
  (7, 'Termo', 3, 5, 3000, 20, 'Termo de capacidad 500ml de acero inoxidable con doble capa térmica. Nuestro modelo es ergonómico, ligero e irrompible y tiene un pico vertedor reforzado. Apto para bebidas frías y calientes. 100% hermético. Añadí tu dibujo o imagen personalizada.', '{"1691687156452termo2.jpg", "1691687156446termo1.jpg", "1691687156743termo3.jpg", "1691687156747termo4.jpg"}'),
  (8, 'Termo', 2, 5, 3000, 15, 'Termo de capacidad 500ml de acero inoxidable con doble capa térmica. Nuestro modelo es ergonómico, ligero e irrompible y tiene un pico vertedor reforzado. Apto para bebidas frías y calientes. 100% hermético. Añadí tu dibujo o imagen personalizada.', '{"1691687156446termo1.jpg", "1691687156452termo2.jpg", "1691687156743termo3.jpg", "1691687156747termo4.jpg"}'),
  (9, 'Taza', 3, 5, 2000, 50, 'Taza de porcelana de capacidad 300ml. Nuestras tazas son de excelente calidad y terminación. Soportan microondas, resisten abrasivos y limpiadores de cocina. Añadí tu dibujo o imagen personalizada.', '{"1691687185414taza4.jpg", "1691687185405taza1.jpg", "1691687185408taza2.jpg", "1691687185412taza3.jpg"}'),
  (10, 'Taza', 1, 5, 2000, 60, 'Taza de porcelana de capacidad 300ml. Nuestras tazas son de excelente calidad y terminación. Soportan microondas, resisten abrasivos y limpiadores de cocina. Añadí tu dibujo o imagen personalizada.', '{"1691687185405taza1.jpg", "1691687185408taza2.jpg", "1691687185412taza3.jpg", "1691687185414taza4.jpg"}'),
  (11, 'Gorra', 5, 5, 5300, 100, 'Gorra talle único. Añadí tu dibujo o imagen personalizada.', '{"1692222517580gorra-1.jpg", "1692222517629gorra-2.jpg", "1692222517637gorra-3.jpg", "1692222517651gorra-4.jpg"}'),
  (12, 'Mate', 1, 5, 2500, 50, 'Mate de plástico, incluye bombilla. Añadí tu dibujo o imagen personalizada.', '{"1692222556577mate-frase1.jpg", "1692222556579mate-racing.jpg", "1692222556863mate-ruta40.jpg", "1692222556865mate-travel.jpg"}');
  
  
  -- Poblar la tabla "usersCategories" 
  INSERT INTO users_categories (id_category, category)
VALUES
    (1, 'cliente'),
    (2, 'administrador');
    
    -- Poblar la tabla "users"
INSERT INTO users (id_user, name_user, lastname_user, email_user, password_user, bdate_user, image_user, category_id)
VALUES
    ('9a342b32-78aa-4baf-b260-c20b6ad1407b', 'Carlynne', 'Kebbell', 'ckebbell4@blinklist.com', '$2a$04$qBjWPqZZdud9GBOR6EOUl.0VrktzUKX0FClb7b8FYZ/eAF/cSXkUu', '2000-10-16', 'default.png', 1), 
    ('285c3ff5-f2a0-4fbd-b7db-58a0c022274b', 'Donni', 'Banstead', 'dbanstead5@parallels.com', '$2a$04$94F7Yl/y051xKDQp7T0Yv.1z7G7Tlp.pttk8fdiPhDt60nADboBci', '1998-12-16', 'default.png', 1), 
    ('6b7256aa-c0e6-468c-9640-34a2c3753554', 'Freedman', 'Goldine', 'fgoldine6@taobao.com', '$2a$04$AdoU8jUGoFaVcgoJdCJNY.RbJ0CrYNcH9roGMht11oLVdwL4OAQ.2', '1970-11-16', 'default.png', 1), 
    ('3d691728-f188-4aeb-ae12-e77a7f443dd6', 'Sergeant', 'Eagle', 'seagle7@ftc.gov', '$2a$04$GbIQirv/5VYG9/QMwvcJHeBMKRuD73uhZQTGXTzsCIZpoMhDiRKca', '2010-12-16', 'default.png', 1), 
    ('9bf0833c-6c97-4ca4-9274-732709987100', 'Roddy', 'Iannello', 'riannello8@nydailynews.com', '$2a$04$UfNQXU1xVyde13SizNF9oee53neyFElXPssVN.AG87LHY/nVOaYVO', '2000-10-15', 'default.png', 1), 
    ('02a3129a-d313-440f-b5cb-bf418346402b', 'Belinda', 'Shearme', 'bshearme9@github.io', '$2a$04$tUUY0LK9OicVH13jRM3uIu0I6bdZHtG8XAQq3Nymwqkq803euoDEy', '2003-01-03', 'default.png', 1), 
    ('1ead7088-25d1-4701-943e-d8d6e972f960', 'Laura', 'Ocampo', 'laura_ocampo5@hotmail.com', '$2a$10$dNCpfb00q3g50Q0QZmBzK.fas9Swna7pb0gq2hZPoGdPuQoD5cxmC', '1996-07-05', '1692915888742IMG_20191028_112748_889.jpg', 1),
    ('c6cf5200-afb6-409e-9c27-6e520eecd3c6', 'dani', 'casta', 'dani@gmail.com', '$2a$10$07BUoQuqbz5MZkEi/k41vOULsc3n6BMrElgEisttOsUIEOLmpOPnu', '2020-12-16', 'default.png', 1), 
    ('26e20834-eb33-48fd-a8cc-f74ed528895d', 'mercedes', 'lavezzolo', 'mer.lavezzolo@gmail.com', '$2a$10$ymG3iYO4rxFUQQxZZVNu8eqwMMuVkVBwSIiMAKGSDX4K5dVEfzjQS', '2020-12-15', '1693877859754foto carnet mercedes lavezzolo.JPG', 2),
    ('c4e10427-6b6e-472a-8a6a-8862a5a55e90', 'mercedes', 'lavezzolo', 'mer.lavezzoiilo@gmail.com', '$2a$10$cec8j.VJgrZkeDc08pB2Z.k75A0/R/37syTeecnekK4ofmabuxDt6', '2020-12-15', 'default.png', 1), 
    ('99a5a4b0-c74c-4c6f-bc7c-fcb0c4a842db', 'Desiree', 'Holowiniec', 'holowiniec.desiree@gmail.com', '$2a$10$TyV52Qi5pEggfhRuqJiVHuzzCOqgAjiYXTkd92txEzXrErqNEz35W', '1994-11-02', '1693874656297IMG_5062.jpg', 2), 
    ('7a3cb01c-96b4-494c-aa0a-2f5c06a1d1ba', 'Sofia', 'Holowiniec', 'sofia.holowiniec@hotmail.com', '$2a$10$OmBwVwJDA7f6ilcptXHXAuQJWD37mb0wEz.A5PLvFblemVOcmt7Ra', '1996-12-03', '1693876586368est-taza.jpg', 1);
    
    
    -- Poblar la tabla "shoppingCart"
INSERT INTO shopping_cart (user_id, quantity_shop, tprice_shop)
VALUES
    ('9a342b32-78aa-4baf-b260-c20b6ad1407b', 3, 1150.00),
    ('6b7256aa-c0e6-468c-9640-34a2c3753554', 1, 2500.00),
    ('02a3129a-d313-440f-b5cb-bf418346402b', 2, 8000.00),
    ('7a3cb01c-96b4-494c-aa0a-2f5c06a1d1ba', 4, 2000.00),
    ('285c3ff5-f2a0-4fbd-b7db-58a0c022274b', 1, 3000.00),
    ('c6cf5200-afb6-409e-9c27-6e520eecd3c6', 2, 9000.00),
    ('99a5a4b0-c74c-4c6f-bc7c-fcb0c4a842db', 3, 1500.00);
    
    
    -- Poblar la tabla "productSales"
-- Población de la tabla "productSales" para coincidir con los 7 carritos de compras
INSERT INTO product_sales (shopping_id, product_id, quantity_sale, colour_id, size_id)
VALUES
    (1, 1, 1, 1, 1),
    (1, 2, 2, 2, 2),
    (2, 4, 1, 2, 4),
    (3, 5, 2, 1, 1),
    (4, 6, 4, 2, 2),
    (5, 7, 1, 1, 3),
    (6, 9, 2, 1, 1),
    (7, 10, 1, 2, 2),
    (7, 11, 1, 1, 3),
    (7, 12, 1, 2, 4);