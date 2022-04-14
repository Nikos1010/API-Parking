-- drop database parking;
-- create database parking;
-- use parking;
-- Color del carro
create table color (
	id_color int not null primary key auto_increment,
    color varchar(20) not null
);
-- Tipo de carro
create table car_type (
	id_type int not null primary key auto_increment,
    car_type varchar(20) not null
);
-- informacion del carro
create table car (
	id_car int not null auto_increment,
    plate varchar(8) not null,
    id_type int not null,
    id_color int not null,
    primary key (id_car),
    foreign key (id_type) references car_type(id_type),
    foreign key (id_color) references color(id_color)
);
-- Detalle lote
create table detail_lot (
	id_lot int not null primary key auto_increment,
    price_hour int not null,
    price_day int not null,
    number_slots int not null
);
-- lote de parqueo
create table parking_lot (
	id_slot int not null primary key auto_increment,
    disponibility boolean not null,
    id_lot int not null,
    foreign key (id_lot) references detail_lot(id_lot)
);
-- Factura o detalle del parqueadero
create table invoice (
	id_invoice int not null primary key auto_increment,
	id_car int not null,
    id_slot int not null,
    entrance datetime not null,
    foreign key (id_slot) references parking_lot(id_slot),
    foreign key (id_car) references car(id_car)
);
-- Detalle de factura
create table invoice_detail (
	id_detail int not null primary key auto_increment,
    departure datetime not null,
    id_invoice int not null,
    foreign key (id_invoice) references invoice(id_invoice)
);

select * from detail_lot;
select * from parking_lot;
select * from color;
select * from car_type;
select * from car;
select * from invoice;

UPDATE parking_lot SET disponibility = true WHERE id_slot = 2;

