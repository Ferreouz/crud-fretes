\c freights;


INSERT INTO "Vehicles" ("plate", "name", "type")
VALUES ('CGI-1234', 'Caminhão grandão', 'Caminhão'),
('XXX-9999', 'Caminhonete da garagem', 'Caminhonete'),
('ZZZ-1111', 'Aquele Furgão', 'Furgão');

INSERT INTO "Freights" ("product_name", "distance", "vehicle_plate")
VALUES ('Cadeira de Ferro', 10, 'CGI-1234'),
('10kg de Carne', 150, 'XXX-9999'),
('2 bois', 800, 'ZZZ-1111');

INSERT INTO "Users" ("name", "type", "email", "password") 
VALUES ('Gabriel', 'driver', 'user@user.com', '$2b$09$8lPRksDVXoyeADzsu2gBmuWJsUVhX.Qn3tO7HAP/Q8BTdbPVBrEGy');