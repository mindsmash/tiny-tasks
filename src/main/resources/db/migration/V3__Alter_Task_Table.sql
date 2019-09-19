ALTER TABLE task
    ADD COLUMN username VARCHAR(64);

ALTER TABLE task
    ADD CONSTRAINT username_fk1 FOREIGN KEY (username) REFERENCES users (username);
