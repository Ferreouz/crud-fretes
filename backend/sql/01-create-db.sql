CREATE DATABASE freights;

\c freights;

CREATE TABLE "VehicleTypes" (
    "name" VARCHAR(255) NOT NULL,
    "weight" INT NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT "PK_VehicleTypes" PRIMARY KEY ("name")
);

CREATE TABLE "Vehicles" (
    "plate" CHAR(8) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT "PK_Vehicles" PRIMARY KEY ("plate"),
    CONSTRAINT "FK_VehicleType" FOREIGN KEY ("type") REFERENCES "VehicleTypes" ("name") ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE "Users" (
    "id" serial primary key NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(10) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now(),
    "active" boolean DEFAULT true
);

CREATE TABLE "Freights" (
    "id" serial primary key NOT NULL,
    "product_name" VARCHAR(255),
    "driver_id" INT,
    "distance" INT NOT NULL,
    "vehicle_plate" CHAR(8) NOT NULL,
    "closed_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT "FK_Vehicle" FOREIGN KEY ("vehicle_plate") REFERENCES "Vehicles" ("plate") ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT "FK_Driver" FOREIGN KEY ("driver_id") REFERENCES "Users" ("id") ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE "FreightDriverRequests" (
    "driver_id" INT NOT NULL,
    "freight_id" INT NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT now(),
    "status" VARCHAR(10) DEFAULT 'waiting',
    "updated_at" TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT "FK_Driver_Id" FOREIGN KEY ("driver_id") REFERENCES "Users" ("id") ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT "FK_Freight_Id" FOREIGN KEY ("freight_id") REFERENCES "Freights" ("id") ON UPDATE CASCADE ON DELETE RESTRICT,
    PRIMARY KEY ("driver_id", "freight_id")
);

