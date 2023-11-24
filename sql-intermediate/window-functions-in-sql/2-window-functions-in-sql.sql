# Understanding Window Functions

# While GROUP BY takes a pile of data and compresses it down to a more manageable size, window functions are more like origami artists - they transform the data in intricate ways but don't throw any of it away. With GROUP BY, you get a neat summary, but with window functions, you get a detailed narrative that still tells you the whole story.


USE football;


# Implementing Window Functions
SELECT ROW_NUMBER() OVER() AS row_num, name
FROM football.players;

SELECT column_name1, 
window_function OVER(ORDER BY column_name2) AS column_name
FROM dataset;

SELECT ROW_NUMBER() OVER(ORDER BY last_season DESC) AS row_num,
name, last_season
FROM football.players;

SELECT column_name1, 
window_function OVER(PARTITION BY column_name ORDER BY coumn_name2) AS column_name
FROM dataset;

SELECT ROW_NUMBER() OVER(PARTITION BY last_season ORDER BY last_season DESC) AS row_num, name, last_season
FROM football.players;


# Aggregate Functions and Window Functions
SELECT column_name1, 
aggregate_function OVER(ORDER BY column_name2) AS column_name
FROM dataset;

SELECT COUNT(name) OVER(PARTITION BY last_season ORDER BY last_season DESC) AS total_sum,
name, last_season
FROM football.players;


# Ranking Data
SELECT column_name1, 
RANK() OVER (ORDER BY coumn_name2) AS column_name
FROM dataset;

SELECT RANK() OVER(PARTITION BY last_season ORDER BY highest_market_value_in_eur DESC) AS ranked,
    name, 
    highest_market_value_in_eur
FROM football.players;

SELECT DENSE_RANK() OVER(PARTITION BY last_season ORDER BY highest_market_value_in_eur DESC) AS ranked,
    name, 
    highest_market_value_in_eur
FROM football.players;


# LEAD & LAG
SELECT LAG(column_name, lag_number) OVER (ORDER BY column_name2) AS lag_name
FROM dataset;

SELECT name, LAG(name, 1) OVER( ORDER BY highest_market_value_in_eur) AS lag_name
FROM football.players;


# Bounded and Unbounded
SELECT name, highest_market_value_in_eur,
SUM(highest_market_value_in_eur) OVER (ORDER BY highest_market_value_in_eur DESC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS total_sum
FROM football.players;

SELECT name, highest_market_value_in_eur,
SUM(highest_market_value_in_eur) OVER (ORDER BY highest_market_value_in_eur DESC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS total_sum
FROM football.players;


# NTILES
SELECT name, highest_market_value_in_eur,
NTILE(4) OVER (ORDER BY highest_market_value_in_eur DESC) AS splits
FROM football.players;


# Submission

# You’ll need to prepare an SQL statement based on the information below: Use the first SQL query in "Bounded and Unbounded" as a template and adapt the code accordingly below. Instead of sorting by highest_market_value_in_eur, sort by height_in_cm instead. Instead of returning the sum of highest_market_value_in_eur, return the sum of height_in_cm. Instead of only using 2 preceding rows, use 3 preceding rows instead. Replace the name of the column name from total_sum to your Campus App username (refer to image below for a reference on how to get it) 

SELECT name, height_in_cm,
SUM(height_in_cm) OVER (ORDER BY height_in_cm DESC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS aguito
FROM football.players;
