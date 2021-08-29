CREATE TABLE coyo_user (
    id VARCHAR(36) CONSTRAINT user_id_pkey PRIMARY KEY,
    email VARCHAR(40) NOT NULL
);

CREATE TABLE notification (
    id VARCHAR(36) CONSTRAINT notification_id_pkey PRIMARY KEY,
    cron_expression VARCHAR(128) NOT NULL,
    active BOOLEAN NOT NULL
);

ALTER TABLE task
    ADD COLUMN state VARCHAR(10) NOT NULL,
    ADD COLUMN user_id VARCHAR(36) NOT NULL,
    ADD COLUMN due_date DATE,
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES coyo_user (id);
