-- For help \?

-- list database \l

--Create database [name];

-- list all tables \d

Create table products(
    id int,
    name varchar(50),
    price int,
    on_sale boolean
);

alter table products ADD COLUMN features;
alter table products DROP column features;

Create table restaurants(
    id BIGSERIAL not null PRIMARY KEY,
    name varchar(50) not null,
    location varchar(50) not null,
    price_range int not null check(price_range >=1 and price_range<=5)
);

insert into restaurants (id,name,location,price_range) 
values (123,'mcdonalds','New York',3);

CREATE TABLE reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT check(rating>=1 and rating <=5)
);
