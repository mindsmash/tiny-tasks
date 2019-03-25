CREATE TABLE todo (
  id INT NOT NULL PRIMARY KEY,
  task VARCHAR (100),
  is_completed boolean DEFAULT false
);

INSERT INTO todo(id, task) VALUES(1, 'test');
