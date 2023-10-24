CREATE TABLE recipes (
    ID int UNIQUE NOT NULL
    title varchar(64) NOT NULL
    ingredients text NOT NULL
    description text NOT NULL
    PRIMARY KEY (ID)
);
