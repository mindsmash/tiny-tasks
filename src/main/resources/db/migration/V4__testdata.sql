INSERT INTO users (id, username, password, phone_number, date_created)	VALUES (1,'coyo', '{bcrypt}$2a$10$.BMY4QxKMv.9z0vW3Hlae.kUhXx5paD65a0L4HnQyNplvY4m.35da', '+254712345678', now());
INSERT INTO user_role(id, user_id, role_id) VALUES (1, 1, 1);
INSERT INTO task(id, name, created, user_id)	VALUES ('4ac91133-13b0-4550-8f15-8d3e32d6d7e5', 'interview', now(), 1);
