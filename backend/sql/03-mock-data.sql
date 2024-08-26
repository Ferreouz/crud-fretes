\c freights;


INSERT INTO "Vehicles" ("plate", "name", "type")
VALUES ('CGI-1234', 'Optimus Prime', 'Caminhão'),
('XXX-9999', 'Buble Bee', 'Caminhonete'),
('ZZZ-1111', 'McLaren', 'Furgão');

INSERT INTO "Freights" ("distance", "vehicle_plate")
VALUES (10, 'CGI-1234'),
(150, 'XXX-9999'),
(800, 'ZZZ-1111');
