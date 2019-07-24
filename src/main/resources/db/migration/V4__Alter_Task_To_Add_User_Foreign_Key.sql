alter table task
  add column user_id SERIAL NOT NULL;

ALTER TABLE task
  ADD CONSTRAINT t_user_id_fk1 FOREIGN KEY (user_id) REFERENCES "user" (id) MATCH FULL;
