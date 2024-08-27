\c freights;


INSERT INTO "Vehicles" ("plate", "name", "type")
VALUES ('CGI-1234', 'Optimus Prime', 'Caminhão'),
('XXX-9999', 'Buble Bee', 'Caminhonete'),
('ZZZ-1111', 'McLaren', 'Furgão');

INSERT INTO "Freights" ("product_name", "distance", "vehicle_plate")
VALUES ('Cadeira de Ferro', 10, 'CGI-1234'),
('10kg de Carne', 150, 'XXX-9999'),
('2 bois', 800, 'ZZZ-1111');
