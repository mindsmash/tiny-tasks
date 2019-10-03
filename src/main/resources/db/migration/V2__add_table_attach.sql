CREATE TABLE Attach (
    id VARCHAR(36) CONSTRAINT attach_id_pkey PRIMARY KEY,
    file_name VARCHAR (128) NOT NULL,
    file_type VARCHAR (128),
    bin_attach BYTEA
);
ALTER TABLE Task ADD COLUMN attach_id VARCHAR(36);
ALTER TABLE Task ADD FOREIGN KEY (attach_id) REFERENCES Attach(id);