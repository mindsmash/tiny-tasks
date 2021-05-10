CREATE TABLE IF NOT EXISTS users (
                       id VARCHAR(255) CONSTRAINT users_pkey PRIMARY KEY,
                       username VARCHAR (255) NOT NULL UNIQUE,
                       email VARCHAR(255) NOT NULL UNIQUE
);
ALTER TABLE tiny_task.public.task ADD isdone BOOLEAN;
ALTER TABLE tiny_task.public.task ADD dueDate DATE;
ALTER TABLE tiny_task.public.task ADD users_id VARCHAR(255) NOT NULL CONSTRAINT task_users_fk REFERENCES users default 0;

INSERT INTO users (id, username, email) VALUES ('5bfd659b-3195-4310-99ea-5d3e33d99ed8', 'phil', 'ptkallmeyer@netfonds.de');
INSERT INTO tiny_task.public.task (id, name, isdone, created, dueDate, users_id) VALUES ('a4f9e34c-03c5-404b-a98f-70c624730d42', 'Task1', false, current_timestamp, '2021-05-10','5bfd659b-3195-4310-99ea-5d3e33d99ed8');
INSERT INTO tiny_task.public.task (id, name, isdone, created, dueDate, users_id) VALUES ('68e61b84-09dd-43bc-81dd-2eca1f1cb5e5', 'Task2', false, current_timestamp, '2021-05-11','5bfd659b-3195-4310-99ea-5d3e33d99ed8');
INSERT INTO tiny_task.public.task (id, name, isdone, created, dueDate, users_id) VALUES ('4a72917d-01ac-43ac-bd95-59209293e854', 'Task3', false, current_timestamp, '2021-05-04','5bfd659b-3195-4310-99ea-5d3e33d99ed8');
INSERT INTO tiny_task.public.task (id, name, isdone, created, dueDate, users_id) VALUES ('6d1dcff0-d399-49ab-9281-1fcbd128dcfb', 'Task4', true, current_timestamp, '2021-05-11','5bfd659b-3195-4310-99ea-5d3e33d99ed8');

