insert into users (id, username, password, phone_number, date_created)	values (-1,'coyo', '{bcrypt}$2a$10$.BMY4QxKMv.9z0vW3Hlae.kUhXx5paD65a0L4HnQyNplvY4m.35da', '+254712345678', now());
insert into user_role(id, user_id, role_id) values (-1, -1, 1);
insert into task(id, name, created, user_id)	values ('4ac91133-13b0-4550-8f15-8d3e32d6d7e5', 'interview', now(), -1);
