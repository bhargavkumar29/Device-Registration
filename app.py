from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import re
from pymongo import MongoClient

app = Flask(__name__)

# Enable CORS for all routes from http://localhost:5173
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# MongoDB client setup
client = MongoClient("mongodb://localhost:27017/")
db = client["deviceDB"]
devices_collection = db["devices"]

# Function to validate IP address format
def is_valid_ip(ip):
    pattern = r'^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$'
    return re.match(pattern, ip) is not None

# Route to register a new device
@app.route('/add_device', methods=['POST'])
def add_device():
    data = request.get_json()
    
    device_name = data.get('deviceName')
    ip_address = data.get('ipAddress')
    password = data.get('password')

    # Check for missing fields
    if not device_name or not ip_address or not password:
        return jsonify({"message": "All fields are required"}), 400

    # Validate IP address format
    if not is_valid_ip(ip_address):
        return jsonify({"message": "Invalid IP address format"}), 400

    # Check if the device already exists
    existing_device = devices_collection.find_one({"deviceName": device_name})
    if existing_device:
        return jsonify({"message": "Device already exists"}), 409

    # Add device to MongoDB
    devices_collection.insert_one({
        "deviceName": device_name,
        "ipAddress": ip_address,
        "password": password
    })
    
    return jsonify({"message": "Device registered successfully"}), 201

# Route to check device availability
@app.route('/check_availability', methods=['GET'])
def check_availability():
    device_name = request.args.get('deviceName')
    input_password = request.args.get('password')

    # Find the device by name
    device = devices_collection.find_one({"deviceName": device_name})

    if not device:
        return jsonify({"message": "Device not found"}), 404

    if device['password'] != input_password:
        return jsonify({"message": "Incorrect Password"}), 403

    # Simulate reachability check using a random number
    if random.randint(0, 100) % 2 == 0:
        return jsonify({"status": "Reachable"})
    else:
        return jsonify({"status": "Not Reachable"})

# New route to get all registered devices
@app.route('/get_devices', methods=['GET'])
def get_devices():
    devices = list(devices_collection.find({}, {"_id": 0}))  # Exclude MongoDB's default ObjectId
    return jsonify({"devices": devices})

if __name__ == '__main__':
    app.run(debug=True)
