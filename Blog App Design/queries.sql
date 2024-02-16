CREATE TABLE posts (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(200) NOT NULL UNIQUE,
    content TEXT,
	author varchar(50),
    date TIMESTAMP
);

insert into posts (title, content, author, date) values
('My first personal blog','I am studying how to use Node.js, Express.js, postgreSQL and EJS to create a blog app', 
'Fengjie Zhang', CURRENT_TIMESTAMP);


insert into posts (title, content, author, date) values
('Victoria''s power outage caught thousands by surprise — here''s how it happened','On Tuesday afternoon, about 620,000 Victorian homes and businesses blacked out.

About 530,000 were through power outages caused primarily by downed powerlines, and another 90,000 via load shedding — a deliberate "last resort" option where the market operator directs power companies to switch off electricity to consumers.

With an average household size of 2.52 people — and businesses often even more — the total number of Victorians without power for part of the sweltering afternoon is likely more than 1.5 million.', 
'Harrison Tippet', CURRENT_TIMESTAMP);
insert into posts (title, content, author, date) values
('I want to be a full stack specialist','During my studies, I found it immensely enjoyable to delve deeper into JavaScript, CSS, HTML, Postman, Node.js, and PostgreSQL. This enhanced understanding has fueled my desire to pursue a career in this field', 
'Fengjie Zhang', CURRENT_TIMESTAMP);


select * from posts;