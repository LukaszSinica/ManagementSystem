INSERT INTO timer (id, username, date, time, from_time, to_time) VALUES (1, "admin", CURRENT_DATE(), 10800, DATE_SUB(NOW(), INTERVAL 3 HOUR), NOW());
INSERT INTO timer (id, username, date, time, from_time, to_time) VALUES (2, "admin", CURRENT_DATE(), 18000, DATE_SUB(NOW(), INTERVAL 5 HOUR), NOW());