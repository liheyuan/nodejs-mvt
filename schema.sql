CREATE TABLE admin_user(
   id       INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
   username VARCHAR(128) NOT NULL,
   password VARCHAR(128) NOT NULL
);

-- md5('nodejs_mvt' + '123456')
INSERT INTO admin_user VALUES(0, 'admin', '0495f9d421d65951c3e0ad9c21f1f34a');

CREATE TABLE news(
   id    INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
   title VARCHAR(128) NOT NULL,
   catId INTEGER,
   tags VARCHAR(256),
   show BOOLEAN,
   content TEXT
);