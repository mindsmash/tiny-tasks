INSERT  INTO role(id,name) VALUES(1,'ROLE_SUPER_ADMIN') ON CONFLICT (id) DO NOTHING;
INSERT  INTO role(id,name) VALUES(2,'ROLE_USER') ON CONFLICT (id) DO NOTHING;

INSERT INTO "user"(id,email,password,first_name,sur_name,sex,account_active) values
(1,'tinytask@tinytask.com','$2a$12$jF.wQ05wR82fxPWvA9v5UuVt2fRkfrp.GwQxu03E/NCPtVVmnmm7u','tiny','task','MALE','1') ON CONFLICT(email) DO NOTHING;

insert into "users_roles"(user_id, role_id) values (1, 2) ON CONFLICT(user_id) DO NOTHING;
