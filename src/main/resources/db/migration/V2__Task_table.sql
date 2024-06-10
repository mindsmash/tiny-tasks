CREATE TABLE "user"
(
  id       BIGSERIAL PRIMARY KEY,
  email    VARCHAR(128) NOT NULL,
  password VARCHAR(256) NOT NULL,
  created  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_unique_email ON "user" (email);

ALTER TABLE task
  ADD COLUMN user_id BIGINT NOT NULL;

ALTER TABLE task
  ADD CONSTRAINT fk_user
    FOREIGN KEY (user_id) REFERENCES "user" (id);

