-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               6.0.3-alpha-community - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.1.0.4867
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for transport
CREATE DATABASE IF NOT EXISTS `transport` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `transport`;


-- Dumping structure for table transport.driver_info
CREATE TABLE IF NOT EXISTS `driver_info` (
  `id` varchar(50) NOT NULL,
  `driver_name` varchar(80) NOT NULL,
  `driver_address` longtext NOT NULL,
  `driver_licence_no` varchar(50) NOT NULL,
  `driver_mobile_no` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table transport.trips
CREATE TABLE IF NOT EXISTS `trips` (
  `id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table transport.trip_details
CREATE TABLE IF NOT EXISTS `trip_details` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `trip_name` varchar(50) NOT NULL,
  `vechile_no` varchar(50) NOT NULL,
  `driver_id` varchar(50) NOT NULL,
  `leaving_time` longtext,
  `status` varchar(50) DEFAULT NULL,
  `entering_time` longtext,
  `leaving_km` bigint(20) DEFAULT NULL,
  `entering_km` bigint(20) DEFAULT NULL,
  `total_km` bigint(20) DEFAULT NULL,
  `trip_time` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_trip_details_driver_info` (`driver_id`),
  KEY `FK_trip_details_trips` (`trip_name`),
  KEY `FK_trip_details_vechile_details` (`vechile_no`),
  CONSTRAINT `FK_trip_details_trips` FOREIGN KEY (`trip_name`) REFERENCES `trips` (`id`),
  CONSTRAINT `FK_trip_details_vechile_details` FOREIGN KEY (`vechile_no`) REFERENCES `vechile_details` (`id`),
  CONSTRAINT `FK_trip_details_driver_info` FOREIGN KEY (`driver_id`) REFERENCES `driver_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table transport.vechile_details
CREATE TABLE IF NOT EXISTS `vechile_details` (
  `id` varchar(50) NOT NULL,
  `vechile_name` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
