-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema test
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema test
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `uid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE INDEX `uid_UNIQUE` (`uid` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Bank`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Bank` (
  `bid` INT NOT NULL AUTO_INCREMENT,
  `bankName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`bid`),
  UNIQUE INDEX `bid_UNIQUE` (`bid` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Account` (
  `aid` INT NOT NULL AUTO_INCREMENT,
  `acNum` VARCHAR(45) NOT NULL,
  `acPw` INT NOT NULL,
  `User_uid` INT NOT NULL,
  `Bank_bid` INT NOT NULL,
  PRIMARY KEY (`aid`),
  UNIQUE INDEX `aid_UNIQUE` (`aid` ASC) VISIBLE,
  INDEX `fk_Account_User_idx` (`User_uid` ASC) VISIBLE,
  INDEX `fk_Account_Bank1_idx` (`Bank_bid` ASC) VISIBLE,
  CONSTRAINT `fk_Account_User`
    FOREIGN KEY (`User_uid`)
    REFERENCES `mydb`.`User` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Account_Bank1`
    FOREIGN KEY (`Bank_bid`)
    REFERENCES `mydb`.`Bank` (`bid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Card`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Card` (
  `cid` INT NOT NULL AUTO_INCREMENT,
  `cardCate` VARCHAR(45) NOT NULL,
  `date` INT NOT NULL,
  `Account_aid` INT NOT NULL,
  `Bank_bid` INT NOT NULL,
  PRIMARY KEY (`cid`),
  UNIQUE INDEX `cid_UNIQUE` (`cid` ASC) VISIBLE,
  INDEX `fk_Card_Account1_idx` (`Account_aid` ASC) VISIBLE,
  INDEX `fk_Card_Bank1_idx` (`Bank_bid` ASC) VISIBLE,
  CONSTRAINT `fk_Card_Account1`
    FOREIGN KEY (`Account_aid`)
    REFERENCES `mydb`.`Account` (`aid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Card_Bank1`
    FOREIGN KEY (`Bank_bid`)
    REFERENCES `mydb`.`Bank` (`bid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`loanInfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`loanInfo` (
  `lid` INT NOT NULL AUTO_INCREMENT,
  `loanMoney` INT NOT NULL,
  `date` INT NOT NULL,
  `plusMoney` INT NOT NULL,
  `User_uid` INT NOT NULL,
  `Bank_bid` INT NOT NULL,
  PRIMARY KEY (`lid`),
  UNIQUE INDEX `lid_UNIQUE` (`lid` ASC) VISIBLE,
  INDEX `fk_loanInfo_User1_idx` (`User_uid` ASC) VISIBLE,
  INDEX `fk_loanInfo_Bank1_idx` (`Bank_bid` ASC) VISIBLE,
  CONSTRAINT `fk_loanInfo_User1`
    FOREIGN KEY (`User_uid`)
    REFERENCES `mydb`.`User` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_loanInfo_Bank1`
    FOREIGN KEY (`Bank_bid`)
    REFERENCES `mydb`.`Bank` (`bid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`saveInfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`saveInfo` (
  `sid` INT NOT NULL AUTO_INCREMENT,
  `saveMoney` INT NOT NULL,
  `plusMoney` INT NOT NULL,
  `deadLine` INT NOT NULL,
  `User_uid` INT NOT NULL,
  `Bank_bid` INT NOT NULL,
  PRIMARY KEY (`sid`),
  UNIQUE INDEX `sid_UNIQUE` (`sid` ASC) VISIBLE,
  INDEX `fk_saveInfo_User1_idx` (`User_uid` ASC) VISIBLE,
  INDEX `fk_saveInfo_Bank1_idx` (`Bank_bid` ASC) VISIBLE,
  CONSTRAINT `fk_saveInfo_User1`
    FOREIGN KEY (`User_uid`)
    REFERENCES `mydb`.`User` (`uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_saveInfo_Bank1`
    FOREIGN KEY (`Bank_bid`)
    REFERENCES `mydb`.`Bank` (`bid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `test` ;

-- -----------------------------------------------------
-- Table `test`.`user_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`user_info` (
  `id` INT NULL DEFAULT NULL,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `gender` VARCHAR(50) NULL DEFAULT NULL,
  `age` INT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
