# Diabeto-Predictor

Diabeto-Predictor is a Flask-based API with a React frontend that predicts the likelihood of diabetes based on various input features. It provides data visualizations and predictions powered by a machine learning model. The backend is deployed on AWS EC2, with data stored on AWS RDS (MySQL) and static files hosted on AWS S3.

## Features
- **Diabetes Prediction API**: Get predictions on diabetes risk based on input features.
- **Data Visualization**: Explore visualizations like histograms, scatter plots, and box plots.
- **Machine Learning Model**: Powered by a RandomForest and GradientBoosting voting classifier.
- **AWS Integration**:
  - EC2 for backend deployment.
  - RDS (MySQL) for database management.
  - S3 for frontend hosting.

## Technology Stack
- **Backend**: Flask, Pandas, Joblib
- **Frontend**: React, Tailwind CSS
- **Machine Learning**: Scikit-learn, Imbalanced-learn (SMOTE), Voting Classifier (RandomForest, GradientBoosting)
- **Data Visualization**: Plotly, Seaborn, Matplotlib
- **AWS**:
  - EC2 for Flask server
  - RDS (MySQL) for database
  - S3 for static assets and frontend

## Prerequisites
- Python 3.x
- Node.js and npm
- AWS account with access to EC2, RDS, and S3 services
- MySQL installed locally or accessible via RDS

## Model Pipeline
The machine learning model is trained on the following features:
- **Numerical**: Age, BMI, FBS, HbA1c
- **Categorical**: Gender, Blood Pressure, Family History of Diabetes, Smoking, Diet, Exercise

The model uses a voting classifier composed of:
- RandomForestClassifier
- GradientBoostingClassifier

## License
This project is licensed under the MIT License.
