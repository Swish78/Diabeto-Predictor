import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier
from sklearn.metrics import accuracy_score, classification_report
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline as ImbPipeline
import joblib

df = pd.read_csv('dataset/Diabetes Classification.csv')

features = ['Age', 'Gender', 'BMI', 'Blood Pressure', 'FBS', 'HbA1c',
            'Family History of Diabetes', 'Smoking', 'Diet', 'Exercise']
target = 'Diagnosis'

X = df[features]
y = df[target]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

numerical_features = ['Age', 'BMI', 'FBS', 'HbA1c']
categorical_features = ['Gender', 'Blood Pressure', 'Family History of Diabetes', 'Smoking', 'Diet', 'Exercise']

numerical_pipeline = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

categorical_pipeline = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

preprocessor = ColumnTransformer(transformers=[
    ('num', numerical_pipeline, numerical_features),
    ('cat', categorical_pipeline, categorical_features)
])

rf_clf = RandomForestClassifier(random_state=42)
gb_clf = GradientBoostingClassifier(random_state=42)

voting_clf = VotingClassifier(estimators=[
    ('rf', rf_clf),
    ('gb', gb_clf)
], voting='soft')

model_pipeline = ImbPipeline(steps=[
    ('preprocessor', preprocessor),
    ('smote', SMOTE(random_state=42)),
    ('classifier', voting_clf)
])

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
cv_scores = cross_val_score(model_pipeline, X_train, y_train, cv=cv, scoring='accuracy')

print(f"Cross-validation scores: {cv_scores}")
print(f"Mean CV score: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")

model_pipeline.fit(X_train, y_train)

pipeline_filename = 'diabetes_classification_pipeline.pkl'
joblib.dump(model_pipeline, pipeline_filename)
print(f"Model pipeline saved to {pipeline_filename}")

y_pred = model_pipeline.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.4f}")
print("Classification Report:")
print(classification_report(y_test, y_pred))

if hasattr(model_pipeline.named_steps['classifier'], 'feature_importances_'):
    feature_importance = model_pipeline.named_steps['classifier'].feature_importances_
    feature_names = model_pipeline.named_steps['preprocessor'].get_feature_names_out()

    importance_df = pd.DataFrame({'feature': feature_names, 'importance': feature_importance})
    importance_df = importance_df.sort_values('importance', ascending=False)

    print("\nTop 10 Feature Importances:")
    print(importance_df.head(10))
