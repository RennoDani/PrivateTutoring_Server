-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: tutoringdb
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `idcontact` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` int DEFAULT NULL,
  `message` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`idcontact`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (114,'ana','ana@email.com',111,'aaaaaaaaaaa ssssssssss fffff hghhhhhhhhhhhhhhhh'),(115,'Carol Smith','carolsmith@email.com',NULL,'Lorem ipsum dolor sit ut labore et dolore magna exercitation. Duis dolor in eu, sunt in culpa qui dolor sit ut labore et dolore magna exercitation ipsum.'),(116,'fsraseras','asfdasdf@afdfasd',NULL,'adfasdfasdf'),(117,'teste','test.code.web.2023@gmail.com',NULL,'afdasdfasd'),(118,'teste2','test.code.web.2023@gmail.com',NULL,'teste 2'),(119,'teste3','test.code.web.2023@gmail.com',NULL,'teste3'),(120,'teste 4','test.code.web.2023@gmail.com',123123421,'testessss'),(121,'tewrtwertwe','test.code.web.2023@gmail.com',3423,'adgadfgdsfgsdfgsdfg'),(122,'class contact ','test.code.web.2023@gmail.com',1234567,'glkmdalfk aog adgndj go godfg adgf');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson`
--

DROP TABLE IF EXISTS `lesson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson` (
  `idlesson` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `type` varchar(1) DEFAULT NULL COMMENT 'W - Writing / R - Reading / L -  Listening / S - Speaking',
  `level` varchar(1) NOT NULL COMMENT 'B - Begginer / I - Intermediate / A - Advanced',
  `filepath` varchar(100) NOT NULL,
  PRIMARY KEY (`idlesson`),
  KEY `fk_type_idx` (`type`),
  KEY `fk_level_idx` (`level`),
  CONSTRAINT `fk_lesson_level` FOREIGN KEY (`level`) REFERENCES `lesson_level` (`level`),
  CONSTRAINT `fk_lesson_type` FOREIGN KEY (`type`) REFERENCES `lesson_type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='			';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson`
--

LOCK TABLES `lesson` WRITE;
/*!40000 ALTER TABLE `lesson` DISABLE KEYS */;
INSERT INTO `lesson` VALUES (1,'1 - Basic Web aaaaa','L','I','PDF_files\\1-Basic_Web_concepts.pdf'),(2,'4 - What is HTML','W','I','PDF_files\\4-What_is_HTML__Definition_and_Meaning.pdf'),(3,'3 - Introduction CSS','L','A','PDF_files\\Class_3_Introduction_CSS.pdf'),(4,'2 - HTML','L','I','PDF_files\\Class_2_HTML.pdf'),(5,'6 - HMTL Forms','R','A','PDF_files\\Class_6_HTML_Forms.pdf'),(7,'7 - DOM elements','R','B','PDF_files\\Class_7_What_is_DOM.pdf'),(8,'9 - JQuery','S','I','PDF_files\\Class_9_JQuery.pdf'),(9,'3 - Class 3 CSS - Working with Colors and blue and yellow and red and others colors','L','A','PDF_files\\Class_3_CSS_-_Working_with_Colors.pdf'),(10,'10 - JQuery Effects','L','I','PDF_files\\Class10_jQuery_Effects.pdf'),(11,'13 - HTML Responsive','R','I','PDF_files\\Class13_HTML_Responsive_Web_Design-1.pdf'),(12,'12_jQuery_Traversing','S','A','PDF_files\\Class12_jQuery_Traversing.pdf'),(13,'13_HTML_Responsive_Web_Design','W','I','PDF_files\\Class13_HTML_Responsive_Web_Design-1.pdf'),(14,'20_Pagination-badges-progressbar','R','A','PDF_files\\Class20_Pagination-badges-progressbar.pdf');
/*!40000 ALTER TABLE `lesson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_level`
--

DROP TABLE IF EXISTS `lesson_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson_level` (
  `description` varchar(45) NOT NULL COMMENT 'B - Basic\nI - Intermediate\nA - Advanced',
  `ordem` int DEFAULT NULL,
  `level` varchar(1) NOT NULL,
  PRIMARY KEY (`level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_level`
--

LOCK TABLES `lesson_level` WRITE;
/*!40000 ALTER TABLE `lesson_level` DISABLE KEYS */;
INSERT INTO `lesson_level` VALUES ('Advanced',3,'A'),('Basic',1,'B'),('Intermediate',2,'I');
/*!40000 ALTER TABLE `lesson_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_type`
--

DROP TABLE IF EXISTS `lesson_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson_type` (
  `description` varchar(45) NOT NULL COMMENT 'Listening\nReading\nSpeaking\nWriting',
  `type` varchar(1) NOT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_type`
--

LOCK TABLES `lesson_type` WRITE;
/*!40000 ALTER TABLE `lesson_type` DISABLE KEYS */;
INSERT INTO `lesson_type` VALUES ('Listening','L'),('Reading','R'),('Speaking','S'),('Writing','W');
/*!40000 ALTER TABLE `lesson_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_user`
--

DROP TABLE IF EXISTS `lesson_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson_user` (
  `idlesson` int NOT NULL,
  `iduser` int NOT NULL,
  PRIMARY KEY (`idlesson`,`iduser`),
  KEY `fk_user_idx` (`iduser`),
  CONSTRAINT `fk_lesson` FOREIGN KEY (`idlesson`) REFERENCES `lesson` (`idlesson`),
  CONSTRAINT `fk_user` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_user`
--

LOCK TABLES `lesson_user` WRITE;
/*!40000 ALTER TABLE `lesson_user` DISABLE KEYS */;
INSERT INTO `lesson_user` VALUES (1,50),(10,50),(1,51),(2,51),(3,51),(4,51),(5,51),(1,52),(8,52),(9,52),(10,52),(1,62),(1,73),(1,77),(10,77),(1,78),(2,78);
/*!40000 ALTER TABLE `lesson_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`email`),
  CONSTRAINT `fk_email_login` FOREIGN KEY (`email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('admin@email.com','$2a$10$4EUKDpLVcDNTwLiDTzE1vem./BzMi0VGem5fwCKuoDWUieX.45nAS'),('ana@email.com','$2a$10$nwXaD15kENWd/F8zLyMNHuq4jc6iZWKV/01oib.bV/7U734oxAkRi'),('bob@email.com','$2a$10$24kqDyDRbNcOznR4F5xZzu39YlHpNbAiwqX3Ealg0YmX4OXLr5LrS'),('edu@email.com','$2a$10$mMdVzQUd9QV..IapBXtOXOQMVupYctYXyQJaoG8ywdHfBimvVaDsS'),('JAMES@EMAIL.COM','$2a$10$0MBQawUJ71Bi6Yuz6hx7FOv.NMYRQ537CJLazq07ebQPhFN4J1Lxe'),('mari@email.com','$2a$10$WA.wo7.XGb2FXjWJLMIEf.hMp5xZT5g5nLxciCPoLerEYgVZIHdIq'),('maria@email.com','$2a$10$x1w2i4oVYC7vjQ6TS6V2ve/zDdfyq3ARP1HICW672vVVWeDimgXxu'),('mary@email.com','$2a$10$WP6/8UIN4wHMaex4YJnXt.Fo.EBBGeNDytUpOP6UucgZDgo1Cb5Jq'),('test.code.web.2023@gmail.com','$2a$10$3XMn7HewVIIfPWLPclNake56zAHQ9RN1pNcqlLHgYEp/RXGplgiO.');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `iduser` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `datebirth` date DEFAULT NULL,
  `profile` varchar(45) NOT NULL DEFAULT 'Student',
  `test_password` varchar(45) DEFAULT NULL,
  `active` varchar(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (49,'Ana Smith','ana@email.com','123789','2000-01-01','student',NULL,'N'),(50,'bob','bob@email.com','4444','2000-10-20','student',NULL,'Y'),(51,'edu','edu@email.com','1234',NULL,'student','HB4wBX','Y'),(52,'Mary bbbbcc','mary@email.com','123345','2000-01-01','student','4bajLw','Y'),(53,'Administrator','admin@email.com',NULL,NULL,'admin','QzP2nf','Y'),(62,'maria','maria@email.com','1234 5678',NULL,'student',NULL,'Y'),(73,'aaaaaa','aaa@aaa',NULL,NULL,'student',NULL,'Y'),(77,'new user','test.code.web.2023@gmail.com',NULL,NULL,'student','ITBgg3XJCM5zl1ajff2mBu2X','Y'),(78,'mariana','mari@email.com','123-456','2011-11-20','student',NULL,'Y'),(79,'JAMES','JAMES@EMAIL.COM','11112222333333',NULL,'student',NULL,'Y');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-16 10:22:13
