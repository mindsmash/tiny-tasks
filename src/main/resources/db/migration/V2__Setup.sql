ALTER TABLE task ADD COLUMN IF NOT EXISTS due_date DATE;

CREATE TABLE IF NOT EXISTS notification_setting (
                                                  id VARCHAR(36) NOT NULL,
                                                  duration VARCHAR(36) NOT NULL,
                                                  email VARCHAR(255) NOT NULL,
                                                  is_active BOOLEAN NOT NULL,
                                                  is_only_due_date BOOLEAN NOT NULL,
                                                  day_before_due_date INT NOT NULL,
                                                  requested_notification_date DATE NOT NULL,
                                                  PRIMARY KEY (id)
);


DROP TRIGGER IF EXISTS check_single_row_trigger ON notification_setting;

CREATE OR REPLACE FUNCTION check_single_row()
  RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM notification_setting) > 1 THEN
    RAISE EXCEPTION 'Only one row is allowed in the notification_setting table';
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER check_single_row_trigger
  AFTER INSERT ON notification_setting
  FOR EACH ROW EXECUTE FUNCTION check_single_row();

INSERT INTO notification_setting (id, duration, email, is_active, is_only_due_date, day_before_due_date, requested_notification_date)
SELECT '123456', 'EVERY_24H', 'test@gmail.com', true, false, 1, '2024-01-01'
WHERE NOT EXISTS (SELECT 1 FROM notification_setting);
