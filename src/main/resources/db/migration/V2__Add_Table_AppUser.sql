CREATE TABLE appuser
(
    id   VARCHAR(36)
        CONSTRAINT app_user_id_pkey PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL
);

ALTER TABLE task
    ADD appuser_id VARCHAR(36)
        CONSTRAINT task_appuser_fk REFERENCES appuser;

ALTER TABLE task
    ADD done BOOLEAN;
