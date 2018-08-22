BEGIN ; 

DROP TABLE IF EXISTS users , posts , comments, posts_vote , comments_vote ;

CREATE TABLE users (
id SERIAL PRIMARY KEY ,
firstName varchar(30), 
lastName varchar(30),
email varchar(100) UNIQUE,
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


COMMIT ;