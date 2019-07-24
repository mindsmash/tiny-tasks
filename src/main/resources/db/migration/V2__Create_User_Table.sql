CREATE
TYPE SEX AS ENUM ('MALE', 'FEMALE');
CREATE TABLE "user"
(
  id             SERIAL PRIMARY KEY,
  email          varchar(60) UNIQUE NOT NULL,
  password bytea NOT NULL,
  first_name     varchar(45)        NOT NULL,
  sur_name       varchar(45)        NOT NULL,
  sex SEX,
  account_active BOOL               NOT NULL DEFAULT '0'

);


