# Import necessary libraries
import pandas as pd
import joblib

pipeline_filename = 'diabetes_classification_pipeline.pkl'
model_pipeline = joblib.load(pipeline_filename)

test_input = pd.DataFrame({
    'Age': [70],
    'Gender': ['Female'],
    'BMI': [35],
    'Blood Pressure': ['Normal'],
    'FBS': [140],
    'HbA1c': [7.1],
    'Family History of Diabetes': ['No'],
    'Smoking': ['No'],
    'Diet': ['Healthy'],
    'Exercise': ['Regular']
})

prediction = model_pipeline.predict(test_input)

print(f"Prediction for input {test_input.iloc[0].to_dict()}: {'Diabetes' if prediction[0] == 1 else 'No Diabetes'}")
