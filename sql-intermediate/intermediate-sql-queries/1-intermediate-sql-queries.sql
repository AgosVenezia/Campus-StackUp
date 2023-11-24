CREATE SCHEMA `football`;

USE football;


# Filtering for Data with Multiple Conditions
SELECT * 
FROM football.players 
INNER JOIN football.club 
ON football.players.current_club_id = football.club.club_id 
WHERE football.club.name = "Manchester United" AND height_in_cm > 170 AND position = "Midfield";

SELECT * 
FROM football.players 
INNER JOIN football.club ON football.players.current_club_id = football.club.club_id WHERE football.club.name = "Manchester United" OR 
football.players.country_of_citizenship = "England";

SELECT * 
FROM football.players 
INNER JOIN football.club ON football.players.current_club_id = football.club.club_id 
WHERE football.club.name != "Manchester United";

SELECT *
FROM football.players
INNER JOIN football.club
ON football.players.current_club_id = football.club.club_id
WHERE football.club.name IN ("Manchester United", "Chelsea FC", "Liverpool");

SELECT *
FROM football.players
INNER JOIN football.club
ON football.players.current_club_id = football.club.club_id
WHERE football.club.name NOT IN ("Manchester United", "Chelsea FC", "Liverpool");


# Filtering for Data Between a Range of Values
SELECT *
FROM ___
WHERE ___ BETWEEN __ AND __;

SELECT name, squad_size
FROM football.club
WHERE squad_size BETWEEN 25 AND 27;

SELECT name, squad_size
FROM football.club
WHERE squad_size > 24 AND squad_size < 28;


# Regular Expressions and String Pattern Detection
SELECT *
FROM football.club
WHERE football.club.name LIKE "man%";

SELECT *
FROM football.club
WHERE football.club.name LIKE "%united";

SELECT *
FROM football.club
WHERE football.club.name LIKE "%chester%";


# Setting Conditions with Cases
SELECT *
CASE
WHEN condition1 THEN output1
WHEN condition2 THEN output2
WHEN condition3 THEN output3
ELSE output4
END AS colum_name
FROM dataset;

SELECT football.players.name, football.players.height_in_cm,
CASE
WHEN football.players.height_in_cm >= 190 THEN "Giant"
WHEN football.players.height_in_cm >= 183 THEN "Tall"
WHEN football.players.height_in_cm <= 173 THEN "Short"
ELSE "Medium"
END AS height
FROM football.players;


# Introducing Subqueries

# Single Row Subqueries
SELECT player_id, football.player_valuations.market_value_in_eur,
(SELECT AVG(football.player_valuations.market_value_in_eur) FROM football.player_valuations)
from football.player_valuations;

# Multiple Row Subqueries
SELECT football.players.name
FROM football.players
WHERE player_id IN
(select player_id
from football.player_valuations
WHERE football.player_valuations.market_value_in_eur > 100000);


# Common Table Expressions
WITH cte_name (column1, column2, ...) AS (

– insert query here

)[

WITH valuations AS (
SELECT *
FROM football.player_valuations
WHERE football.player_valuations.market_value_in_eur >= 10000
)
SELECT *
FROM valuations;


# Submission

# You’ll need to prepare an SQL statement to retrieve the information of clubs from the club dataset who meet the following criteria: the club name ends with “FC” and have a squad size greater than 33

SELECT *
FROM football.club
WHERE football.club.name LIKE "%FC" AND squad_size > 33;