from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
import plotly.express as px
import plotly.graph_objects as go

app = Flask(__name__)
CORS(app)

pipeline_filename = 'diabetes_classification_pipeline.pkl'
model_pipeline = joblib.load(pipeline_filename)

df = pd.read_csv('dataset/Diabetes Classification.csv')


@app.route('/')
def home():
    return jsonify(message="Diabetes Prediction API")


# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # Data from frontend
    input_data = pd.DataFrame([data])  # Convert JSON data to DataFrame
    prediction = model_pipeline.predict(input_data)

    result = 'Diabetes' if prediction[0] == 1 else 'No Diabetes'
    note = 'Please consult a doctor.' if result == 'Diabetes' else 'You are in good health!'

    return jsonify(prediction=result, note=note)


# Data visualization route
@app.route('/visualize', methods=['GET'])
def visualize():
    plots = []

    # Plot 1: Age Distribution (Histogram)
    fig1 = px.histogram(df, x='Age', title='Age Distribution', nbins=10)
    plots.append(fig1.to_json())

    # Plot 2: BMI Distribution (Histogram)
    fig2 = px.histogram(df, x='BMI', title='BMI Distribution', nbins=10)
    plots.append(fig2.to_json())

    # Plot 3: Blood Pressure vs HbA1c (Scatter)
    fig3 = px.scatter(df, x='Blood Pressure', y='HbA1c', color='Diagnosis', title='Blood Pressure vs HbA1c')
    plots.append(fig3.to_json())

    # Plot 4: Gender Distribution by Diagnosis (Bar)
    fig4 = px.bar(df, x='Gender', color='Diagnosis', barmode='group', title='Gender Distribution by Diagnosis')
    plots.append(fig4.to_json())

    # Plot 5: FBS Distribution by Diagnosis (Box Plot)
    fig5 = px.box(df, x='Diagnosis', y='FBS', title='FBS Distribution by Diagnosis')
    plots.append(fig5.to_json())

    # Plot 6: Exercise vs HbA1c (Box Plot)
    fig6 = px.box(df, x='Exercise', y='HbA1c', title='Exercise vs HbA1c')
    plots.append(fig6.to_json())

    return jsonify(plots=plots)


# Footer
@app.route('/footer')
def footer():
    return jsonify(footer="© 2024 Diabetes Prediction App")


if __name__ == '__main__':
    app.run(debug=True)
