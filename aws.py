import pandas as pd
import mysql.connector


csv_file_path = 'dataset/Diabetes Classification.csv'
data = pd.read_csv(csv_file_path)

rds_host = 'database-flask.cd08asi6cz32.ap-south-1.rds.amazonaws.com'
database = 'flask'
username = 'admin'
password = 'jokcin-xuncEj-6zujhe'

connection = mysql.connector.connect(
    host=rds_host,
    database=database,
    user=username,
    password=password
)
cursor = connection.cursor()

table_name = 'diabetes_data'

create_table_query = f"""
CREATE TABLE IF NOT EXISTS {table_name} (
    Age INT,
    Gender VARCHAR(10),
    BMI FLOAT,
    Blood_Pressure VARCHAR(10),
    FBS FLOAT,
    HbA1c FLOAT,
    Family_History_of_Diabetes VARCHAR(3),
    Smoking VARCHAR(3),
    Diet VARCHAR(10),
    Exercise VARCHAR(10),
    Diagnosis VARCHAR(10)
);
"""
cursor.execute(create_table_query)

for index, row in data.iterrows():
    cursor.execute(
        f"""
        INSERT INTO {table_name} (Age, Gender, BMI, Blood_Pressure, FBS, HbA1c, Family_History_of_Diabetes, Smoking, Diet, Exercise, Diagnosis) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (row['Age'], row['Gender'], row['BMI'], row['Blood Pressure'], row['FBS'], row['HbA1c'],
         row['Family History of Diabetes'], row['Smoking'], row['Diet'], row['Exercise'], row['Diagnosis'])
    )

connection.commit()
cursor.close()
connection.close()
print("Table created and data inserted into RDS successfully.")