CREATE TABLE IF NOT EXISTS users
(
    id        SERIAL        PRIMARY KEY,
    email     VARCHAR(255)  UNIQUE NOT NULL,
    password  VARCHAR(255)  NOT NULL
);

CREATE TABLE IF NOT EXISTS pages
(
    id        SERIAL        PRIMARY KEY,
    title     VARCHAR(255)  UNIQUE NOT NULL,
    content   TEXT          NOT NULL
);

CREATE TABLE IF NOT EXISTS tags
(
    id        SERIAL        PRIMARY KEY,
    name      VARCHAR(100)  UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS page_tags --- Molti a Molti ---
(
    page_id   INT REFERENCES pages(id) ON DELETE CASCADE,
    tag_id    INT REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (page_id, tag_id)
);
