BEGIN ; 

DROP TABLE IF EXISTS users , posts , comments, posts_vote , comments_vote ;

CREATE TABLE users (
id SERIAL PRIMARY KEY ,
firstName varchar(30), 
lastName varchar(30),
email varchar(100),
password varchar(200),
age varchar(10) 
);


CREATE TABLE posts (
id SERIAL PRIMARY KEY , 
userID INTEGER ,
postText varchar(1000) ,
postDate varchar(100) ,
FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
id SERIAL PRIMARY KEY , 
userID INTEGER ,
postID INTEGER ,
commentText varchar(100) ,
commentDate varchar(100) ,
FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE,   
FOREIGN KEY (postID) REFERENCES posts(id) ON DELETE CASCADE, 
parent_id INTEGER REFERENCES comments
);

CREATE TABLE posts_vote (
userID INTEGER ,
postID INTEGER ,
value bit ,
PRIMARY KEY (userID,postID) ,
FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE,   
FOREIGN KEY (postID) REFERENCES posts(id) ON DELETE CASCADE   
);


CREATE TABLE comments_vote (
userID INTEGER ,
commentID INTEGER ,
value bit ,
PRIMARY KEY (userID,commentID) ,
FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE,   
FOREIGN KEY (commentID) REFERENCES comments(id) ON DELETE CASCADE    
);
INSERT INTO users (firstName, lastName, email,password, age) VALUES 
('Ibraheem' , 'Ali' , 'Ibraheem@gmail.com','pass',27),
('Ahmed' , 'Alaa' , 'Ahmed@gmail.com','pass',22);

INSERT INTO posts (userID,postText,postDate) VALUES
 (1,'Hi Everyone','19-8-2017'),
  (2,'Hi Everyone','19-8-2017'),
  (2,'Hi Everyone','19-8-2017'),
  (1,'Hi ','19-8-2017');



INSERT INTO comments (userID,postID,commentText,commentDate) VALUES
 (1,1,'Hi Man','19-8-2017'),
 (1,2,'Hi Man','19-8-2017'),
  (1,3,'Hi Man','19-8-2017'),
   (2,2,'Hi Man','19-8-2017'),
    (2,1,'Hi Man','19-8-2017'),
     (2,2,'Hi Man','19-8-2017');

INSERT INTO posts_vote (userID,postID,value) VALUES (2,1,'1');


COMMIT ;