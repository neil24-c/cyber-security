import pandas as pd
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.metrics import classification_report
from sklearn.preprocessing import LabelEncoder
import joblib
import os

# 🔹 Load dataset
data = pd.read_csv("healthcare_network_logs.csv")

# 🔹 Drop source and destination IP (or you can convert them to numeric if needed)
data = data.drop(['source_ip', 'destination_ip'], axis=1)

# 🔹 Encode categorical columns
label_encoders = {}
for col in ['protocol', 'user_role', 'device_type']:
    le = LabelEncoder()
    data[col] = le.fit_transform(data[col])
    label_encoders[col] = le

# 🔹 Convert access_time to hour
data['access_time'] = pd.to_datetime(data['access_time'], format='%H:%M').dt.hour

# 🔹 Encode risk labels (High = 1, Low = 0)
data['risk'] = data['risk'].map({'Low': 0, 'High': 1})

# 🔹 Features and labels
X = data.drop(['risk', 'attack_type'], axis=1)
y = data['risk']

# 🔹 Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 🔹 Train XGBoost model
model = XGBClassifier(use_label_encoder=False, eval_metric='logloss')
model.fit(X_train, y_train)

# 🔹 Save model
os.makedirs("model", exist_ok=True)
joblib.dump(model, "model/xgb_model.pkl")

# 🔹 Show metrics
y_pred = model.predict(X_test)
print("\n📊 Classification Report:\n")
print(classification_report(y_test, y_pred))

print("\n✅ Model training complete. Model saved at model/xgb_model.pkl.")
