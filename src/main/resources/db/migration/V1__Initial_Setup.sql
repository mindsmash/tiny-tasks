CREATE TABLE users (
                       id VARCHAR(255) CONSTRAINT users_pkey PRIMARY KEY,
                       username VARCHAR (255) NOT NULL UNIQUE ,
                       email VARCHAR(255) NOT NULL,
                       password varchar(255) NOT NULL
);
CREATE TABLE tasks (
                       id VARCHAR(255) NOT NULL CONSTRAINT tasks_pkey PRIMARY KEY,
                       name VARCHAR (255) NOT NULL,
                       detail VARCHAR(255),
                       done BOOLEAN,
                       due_date DATE,
                       created TIMESTAMP WITH TIME ZONE NOT NULL,
                       user_id VARCHAR(255) NOT NULL CONSTRAINT tasks_users_fk REFERENCES users
);
CREATE TABLE roles (
                       id VARCHAR(255) NOT NULL CONSTRAINT roles_pkey PRIMARY KEY,
                       role VARCHAR (255) NOT NULL,
                       user_id VARCHAR(255) NOT NULL CONSTRAINT roles_users_fk REFERENCES users
);

INSERT INTO users (id, username, email, password) VALUES ('113683d0-97e4-499d-9a1a-1121f0e9a391', 'john', 'yohannes.molla.ayalew@gmail.com', '$2a$10$R0QgJkAuv97uNB.9UKZ6Lej7XRd0y8uWVUUQeRtcwapn3fbl/vaPa');
INSERT INTO users (id, username, email, password) VALUES ('113683d0-97e4-499d-9a1a-1121f0e9a392', 'jane', 'johnfiresoft@gmail.com', '$2a$10$R0QgJkAuv97uNB.9UKZ6Lej7XRd0y8uWVUUQeRtcwapn3fbl/vaPa');

INSERT INTO roles (id, role, user_id) VALUES ('113683u0-97e4-499d-9c1a-1121f0e9a391', 'USER', '113683d0-97e4-499d-9a1a-1121f0e9a391');
INSERT INTO roles (id, role, user_id) VALUES ('113683u0-97e4-499d-9c1a-1121f0e9a392', 'USER', '113683d0-97e4-499d-9a1a-1121f0e9a392');


INSERT INTO tasks (id, name, detail, done, due_date, created, user_id) VALUES ('113683d0-97e4-499d-9a1a-1121r0e9f391', 'Tiny Task 1', 'Tiny task 1 description', false, '2019-11-14', current_timestamp,'113683d0-97e4-499d-9a1a-1121f0e9a391');
INSERT INTO tasks (id, name, detail, done, due_date, created, user_id) VALUES ('113683d0-97e4-499d-9a1a-1121r0e9f392', 'Tiny Task 2', 'Tiny task 2 description', false, '2019-11-15', current_timestamp,'113683d0-97e4-499d-9a1a-1121f0e9a391');
INSERT INTO tasks (id, name, detail, done, due_date, created, user_id) VALUES ('113683d0-97e4-499d-9a1a-1121r0e9f393', 'Tiny Task 3', 'Tiny task 3 description', false, '2019-11-16', current_timestamp,'113683d0-97e4-499d-9a1a-1121f0e9a391');
INSERT INTO tasks (id, name, detail, done, due_date, created, user_id) VALUES ('113683d0-97e4-499d-9a1a-1121r0e9f394', 'Tiny Task 4', 'Tiny task 4 description', false, '2019-11-17', current_timestamp,'113683d0-97e4-499d-9a1a-1121f0e9a391');
INSERT INTO tasks (id, name, detail, done, due_date, created, user_id) VALUES ('113683d0-97e4-499d-9a1a-1121r0e9f395', 'Tiny Task 5', 'Tiny task 5 description', false, '2019-11-13', current_timestamp,'113683d0-97e4-499d-9a1a-1121f0e9a391');

INSERT INTO tasks (id, name, detail, done, due_date, created, user_id) VALUES ('113683d0-97e4-499d-9a1a-1121r0e9f396', 'Jane Tiny Task 1', 'Jane tiny task 1 description', false, '2019-11-14', current_timestamp,'113683d0-97e4-499d-9a1a-1121f0e9a392');
INSERT INTO tasks (id, name, detail, done, due_date, created, user_id) VALUES ('113683d0-97e4-499d-9a1a-1121r0e9f397', 'Jane Tiny Task 2', 'Jane tiny task 2 description', false, '2019-11-13', current_timestamp,'113683d0-97e4-499d-9a1a-1121f0e9a392');
INSERT INTO tasks (id, name, detail, done, due_date, created, user_id) VALUES ('113683d0-97e4-499d-9a1a-1121r0e9f398', 'Jane Tiny Task 3', 'Jane tiny task 3 description', false, '2019-11-17', current_timestamp,'113683d0-97e4-499d-9a1a-1121f0e9a392');

