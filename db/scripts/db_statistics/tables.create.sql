CREATE TABLE IF NOT EXISTS public.cars
(
    id INTEGER NOT NULL,
    vin VARCHAR (17) NOT NULL UNIQUE,
    CONSTRAINT cars_pkey PRIMARY KEY (id)
);

CREATE TYPE charging_status AS ENUM
    ('charging', 'waiting');

CREATE TABLE IF NOT EXISTS public.statistics
(
    id SERIAL,
    id_car INTEGER,
    datetime timestamp without time zone NOT NULL,
    soc VARCHAR(5) NOT NULL,
    chargingpower INTEGER NOT NULL,
    status charging_status NOT NULL,
    CONSTRAINT statistics_pkey PRIMARY KEY (id),
    CONSTRAINT statistics_id_car_fkey FOREIGN KEY (id_car)
        REFERENCES public.cars (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);