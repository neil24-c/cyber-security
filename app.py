from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import sqlite3
import joblib
import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from utils.features import clean_input

app = Flask(__name__, template_folder="../frontend/templates", static_folder="../frontend/static")
app.secret_key = 'secret123'

# Load ML model
model = joblib.load("model/xgb_model.pkl")

# Database initialization
DB_PATH = "users.db"
def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute('''CREATE TABLE IF NOT EXISTS users (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            username TEXT UNIQUE,
                            password TEXT)''')
init_db()

# Home
@app.route('/')
def home():
    return redirect(url_for('login'))

# Login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = request.form['username']
        pwd = request.form['password']
        with sqlite3.connect(DB_PATH) as conn:
            cur = conn.cursor()
            cur.execute("SELECT * FROM users WHERE username=? AND password=?", (user, pwd))
            if cur.fetchone():
                session['user'] = user
                return redirect(url_for('dashboard'))
        return render_template("login.html", error="Invalid credentials")
    return render_template("login.html")

# Register
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        user = request.form['username']
        pwd = request.form['password']
        try:
            with sqlite3.connect(DB_PATH) as conn:
                conn.execute("INSERT INTO users (username, password) VALUES (?, ?)", (user, pwd))
            return redirect(url_for('login'))
        except sqlite3.IntegrityError:
            return render_template("register.html", error="Username already exists")
    return render_template("register.html")

# Dashboard
@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template("dashboard.html", user=session['user'])

# Logout
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

# Real-time prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        input_data = clean_input(data)
        prediction = model.predict(input_data)[0]
        attack_type = "Brute Force" if prediction == 1 else "None"
        return jsonify({
            "risk": "High" if prediction == 1 else "Low",
            "attack_type": attack_type
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Upload CSV for batch analysis
@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if 'user' not in session:
        return redirect(url_for('login'))

    if request.method == 'POST':
        file = request.files.get('csv_file')
        if not file or file.filename == '':
            return render_template("upload.html", error="No file selected")

        try:
            df = pd.read_csv(file) if file.filename.endswith('.csv') else pd.read_excel(file)
            cleaned = df.copy()
            cleaned = cleaned.drop(['source_ip', 'destination_ip'], axis=1)

            cleaned['protocol'] = pd.Categorical(cleaned['protocol'], categories=["HTTP", "HTTPS", "SSH", "FTP"]).codes
            cleaned['user_role'] = pd.Categorical(cleaned['user_role'], categories=["Doctor", "Nurse", "Technician", "Admin"]).codes
            cleaned['device_type'] = pd.Categorical(cleaned['device_type'], categories=["PC", "Medical Device", "Mobile", "Tablet"]).codes
            cleaned['access_time'] = pd.to_datetime(cleaned['access_time'], format='%H:%M').dt.hour

            predictions = model.predict(cleaned)
            df['Risk'] = ['High' if pred == 1 else 'Low' for pred in predictions]
            df['Attack Type'] = ['Brute Force' if pred == 1 else 'None' for pred in predictions]

            # Save plot
            os.makedirs("../frontend/static/plots", exist_ok=True)
            plot_path = "../frontend/static/plots/risk_chart.png"
            plt.figure(figsize=(6, 4))
            sns.countplot(x='Risk', data=df, palette="coolwarm")
            plt.title("Predicted Risk Distribution")
            plt.tight_layout()
            plt.savefig(plot_path)
            plt.close()

            return render_template("upload_result.html",
                                   logs=df.to_dict(orient="records"),
                                   image_url="/static/plots/risk_chart.png")
        except Exception as e:
            return render_template("upload.html", error=f"Processing failed: {e}")

    return render_template("upload.html")

if __name__ == '__main__':
    print("✅ Flask app running at http://127.0.0.1:5000/")
    app.run(debug=True)
