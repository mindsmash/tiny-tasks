
create TABLE IF NOT EXISTS oauth_access_token (
  authentication_id VARCHAR(256) NOT NULL,
  user_name VARCHAR(36) NOT NULL,
  client_id VARCHAR(36) NOT NULL,
  refresh_token VARCHAR(256) NOT NULL,
  token_id VARCHAR(256) NOT NULL,
  token BYTEA NOT NULL,
  authentication BYTEA NOT NULL
);
