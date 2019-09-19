ALTER TABLE task
    ADD COLUMN user_entity VARCHAR(64);

ALTER TABLE task
    ADD CONSTRAINT username_fk1 FOREIGN KEY (user_entity) REFERENCES users (username);
