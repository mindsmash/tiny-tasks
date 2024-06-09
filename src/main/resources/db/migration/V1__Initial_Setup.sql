CREATE TABLE "user"
(
  id       BIGSERIAL PRIMARY KEY,
  email    VARCHAR(128) NOT NULL,
  password VARCHAR(128) NOT NULL,
  created  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE task
(
  id      VARCHAR(36)
    CONSTRAINT task_id_pkey PRIMARY KEY,
  name    VARCHAR(128)             NOT NULL,
  created TIMESTAMP WITH TIME ZONE NOT NULL,
  user_id BIGINT                  NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "user" (id)
);

