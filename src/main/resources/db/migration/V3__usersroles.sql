
create TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(36) NOT NULL,
  password VARCHAR(100) NOT NULL,
  phone_number VARCHAR(25) NOT NULL,
  account_locked BOOLEAN DEFAULT FALSE,
  account_enabled BOOLEAN DEFAULT TRUE,
  account_expired BOOLEAN DEFAULT FALSE,
  credentials_expired BOOLEAN DEFAULT FALSE,
  deleted BOOLEAN DEFAULT FALSE,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


create TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  authority VARCHAR (20) NOT NULL,
  deleted BOOLEAN DEFAULT FALSE,
  date_created TIMESTAMP WITH TIME ZONE NOT NULL
);

create TABLE IF NOT EXISTS user_role (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  role_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON delete CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles (id) ON delete CASCADE
);

insert into roles (id, authority, date_created) values (1,'ROLE_USER', now());

ALTER TABLE task ADD COLUMN user_id INTEGER;

ALTER TABLE task ADD CONSTRAINT user_task_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
