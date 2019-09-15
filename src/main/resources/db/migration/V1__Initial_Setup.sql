CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR (128) UNIQUE NOT NULL,
  email VARCHAR (128) UNIQUE NOT NULL
);
CREATE TABLE task (
  id VARCHAR(36) CONSTRAINT task_id_pkey PRIMARY KEY,
  name VARCHAR (128) NOT NULL,
  created TIMESTAMP WITH TIME ZONE NOT NULL,
  is_completed BOOLEAN NOT NULL,
  owner_id VARCHAR(36) NOT NULL REFERENCES users(id)
);
