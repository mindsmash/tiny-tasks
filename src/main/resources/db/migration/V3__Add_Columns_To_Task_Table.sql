ALTER TABLE task ADD COLUMN username_responsible VARCHAR(128) NOT NULL;
ALTER TABLE task ADD COLUMN is_task_completed boolean;
