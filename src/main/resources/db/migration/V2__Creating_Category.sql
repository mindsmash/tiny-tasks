CREATE TABLE category (
                    id VARCHAR(255) CONSTRAINT category_id_pkey PRIMARY KEY
);

ALTER TABLE task ADD COLUMN category_id VARCHAR(255) REFERENCES category(id);

INSERT INTO category VALUES ('Doing');
INSERT INTO category VALUES ('Done');
