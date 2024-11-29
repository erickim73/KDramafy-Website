import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_pymongo import PyMongo
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer

# Initialize Flask app, JWT, and MongoDB
app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = "62394879128349817234"  # JWT Secret Key
app.config["MONGO_URI"] = "mongodb+srv://seyoon2006:KDramafy123@kdramafy.8txip.mongodb.net/?retryWrites=true&w=majority&appName=KDramafy"

jwt = JWTManager(app)
mongo = PyMongo(app)

@app.route('/', methods=["GET"])
def home():
    return "Welcome to the KDramafy API!"

# Route to test the API
@app.route('/test', methods=['GET'])
def test():
    return jsonify(message="Test is working"), 200

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid request data"}), 400

        first_name = data.get("firstName")
        last_name = data.get("lastName")
        email = data.get("email")
        password = data.get("password")

        # Validate input fields
        if not first_name or not last_name or not email or not password:
            return jsonify({"error": "All fields are required"}), 400

        # Check for existing user
        if users_collection.find_one({"email": email}):
            return jsonify({"error": "Email already exists"}), 400

        # Add the new user
        user = {
            "firstName": first_name,
            "lastName": last_name,
            "email": email,
            "password": password  
        }
        users_collection.insert_one(user)

        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

# Login endpoint
@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = mongo.db.users.find_one({"email": email})
    if not user or user['password'] != password:
        return jsonify(error="Invalid credentials"), 400

    # Create JWT token
    access_token = create_access_token(identity={"email": user["email"], "id": str(user["_id"])})
    return jsonify(access_token=access_token), 200

# Profile endpoint (requires JWT token)
@app.route('/profile', methods=['POST'])
@jwt_required()
def get_profile():
    current_user = get_jwt_identity()
    return jsonify(current_user), 200

# Recommendation system

def load_data(filepath):
    # Load K-drama data
    return pd.read_json(filepath, orient="records", lines=True)

def get_sentence_transformer(model_name='sentence-transformers/all-MiniLM-L12-v2'):
    # Initialize sentence transformer model
    return SentenceTransformer(model_name)

def manhattan_distance(a, b):
    # Calculate Manhattan distance
    return np.sum(np.abs(a - b))

def filter_kdramas(data, user_input):
    # Filter K-drama data based on user input criteria
    return data[
        (data["Release Year"] >= user_input["minYear"]) &
        (data["Release Year"] <= user_input["maxYear"]) &
        (data["Episodes"] >= user_input["minEpisodes"]) &
        (data["Episodes"] <= user_input["maxEpisodes"]) &
        (data["Rating"] >= user_input["minRating"]) &
        (data["Rating"] <= user_input["maxRating"]) &
        (data["Number of Ratings (num)"] >= user_input["minNumRatings"]) &
        (data["Number of Ratings (num)"] <= user_input["maxNumRatings"])
    ]

def get_recommendations(data, user_input, model):
    # Generate K-drama recommendations based on user preferences
    filtered_data = filter_kdramas(data, user_input)
    user_preference_embedding = model.encode(user_input["user_genre_preference"])

    # Calculate Manhattan distance
    filtered_data["manhattan_distance_similarity"] = filtered_data["Genres_embedding"].apply(
        lambda x: manhattan_distance(user_preference_embedding, np.array(x))
    )

    # Sort by similarity and get top 10 recommendations
    recommended_kdramas = filtered_data.sort_values(by="manhattan_distance_similarity", ascending=True).head(10)
    return recommended_kdramas["Name"].tolist()

@app.route('/recommend', methods=["POST"])
@jwt_required()
def recommend():
    # Handle recommendation requests
    
    # Load user input and K-drama data
    user_input = request.get_json()
    data = load_data("kdrama_data.json")
    model = get_sentence_transformer()

    recommendations = get_recommendations(data, user_input, model)
    return jsonify({"recommendations": recommendations}), 200

if __name__ == "__main__":
    app.run(debug=True)
