CREATE TABLE file (
    id VARCHAR(36) CONSTRAINT file_id_pkey PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    created TIMESTAMP WITH TIME ZONE NOT NULL,
    type VARCHAR(128) NOT NULL,
    content OID,
    content_preview OID,
    task VARCHAR(36) REFERENCES task (id)
);
