CREATE TABLE "role"
(
  id   SERIAL PRIMARY KEY,
  name varchar(255) DEFAULT NULL
);

CREATE TABLE "privilege"
(
  id   SERIAL PRIMARY KEY,
  name varchar(255) DEFAULT NULL
);

CREATE TABLE "roles_privileges"
(
  role_id      SERIAL NOT NULL,
  privilege_id SERIAL NOT NULL,

  CONSTRAINT rp_role_id_fk_1 FOREIGN KEY (role_id) REFERENCES role (id),
  CONSTRAINT rp_privilege_id_fk_2 FOREIGN KEY (privilege_id) REFERENCES privilege (id)
);


CREATE TABLE "users_roles"
(
  user_id SERIAL NOT NULL,
  role_id SERIAL NOT NULL,

  CONSTRAINT ur_role_id_fk_1
    FOREIGN KEY (role_id) REFERENCES role (id),
  CONSTRAINT ur_user_id_fk_2
    FOREIGN KEY (user_id) REFERENCES "user" (id) on delete cascade
);

