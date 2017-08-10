CREATE DATABASE my_project CHARSET=UTF8;
USE my_project;
SET NAMES GBK;
CREATE TABLE pet_list (
	pid		INT PRIMARY KEY AUTO_INCREMENT,
	pname	VARCHAR(20),
	ptype   VARCHAR(20),
	pgender	INT,
	page	INT,
	ploc	VARCHAR(50),
	ppic    VARCHAR(50),
	pdate   DATETIME
);
INSERT INTO pet_list VALUES(null,"大花猫","猫",0,12,"上海","pic16.jpg",now());
INSERT INTO pet_list VALUES(null,"小白猫","猫",0,8,"上海","pic17.jpg",now());
INSERT INTO pet_list VALUES(null,"好听","狗",1,6,"哈尔滨","pic18.jpg",now());
INSERT INTO pet_list VALUES(null,"臭臭","狗",1,10,"广州","pic19.jpg",now());
INSERT INTO pet_list VALUES(null,"三只猫","猫",0,2,"深圳","pic20.jpg",now());
INSERT INTO pet_list VALUES(null,"大白","狗",1,8,"杭州","pic21.jpg",now());
INSERT INTO pet_list VALUES(null,"小白","猫",1,3,"西安","pic22.jpg",now());
INSERT INTO pet_list VALUES(null,"酷儿","兔",0,5,"上海","pic23.jpg",now());
INSERT INTO pet_list VALUES(null,"喳喳","鹦鹉",1,4,"上海","pic24.jpg",now());
