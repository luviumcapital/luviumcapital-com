#!/usr/bin/env python3
"""
Lead Registration Processing Endpoint
Handles form submissions from frontend/registration.html
"""

import json
import re
import os
from datetime import datetime
from typing import Dict, Any, Tuple
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import sqlite3
import logging
from pathlib import Path

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database configuration
DATABASE_PATH = Path(__file__).parent / 'leads.db'

def init_database():
    """Initialize the SQLite database for storing leads"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL,
            company TEXT,
            job_title TEXT,
            country TEXT NOT NULL,
            investment_range TEXT,
            interests TEXT,
            how_heard TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_validated BOOLEAN DEFAULT 0,
            validation_errors TEXT
        )
    ''')
    
    # Create index on email for faster lookups
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_email ON leads(email)')
    
    conn.commit()
    conn.close()
    logger.info("Database initialized successfully")

def clean_text(text: str) -> str:
    """Remove extra whitespace and trim"""
    if not text or not isinstance(text, str):
        return text
    return ' '.join(text.strip().split())

def validate_email(email: str) -> Tuple[bool, str]:
    """Validate email format"""
    if not email:
        return False, "Email is required"
    
    email = clean_text(str(email)).lower()
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    is_valid = bool(re.match(pattern, email))
    
    if not is_valid:
        return False, "Please enter a valid email address"
    
    return True, email

def validate_phone(phone: str) -> Tuple[bool, str]:
    """Validate and standardize phone number"""
    if not phone:
        return False, "Phone number is required"
    
    # Remove non-numeric characters except +
    cleaned_phone = re.sub(r'[^0-9+]', '', str(phone))
    
    # Check if valid length (7-15 digits)
    digits_only = cleaned_phone.replace('+', '')
    if not (7 <= len(digits_only) <= 15):
        return False, "Please enter a valid phone number (7-15 digits)"
    
    return True, cleaned_phone

def validate_name(name: str, field_name: str) -> Tuple[bool, str]:
    """Validate and standardize names"""
    if not name or not isinstance(name, str):
        return False, f"{field_name} is required"
    
    name = clean_text(name)
    if len(name) < 2:
        return False, f"{field_name} must be at least 2 characters long"
    
    if not re.match(r"^[a-zA-Z\s'-]+$", name):
        return False, f"{field_name} can only contain letters, spaces, hyphens, and apostrophes"
    
    return True, name.title()

def validate_country(country: str) -> Tuple[bool, str]:
    """Validate country selection"""
    if not country:
        return False, "Country selection is required"
    
    valid_countries = {
        'US': 'United States',
        'CA': 'Canada',
        'GB': 'United Kingdom',
        'DE': 'Germany',
        'FR': 'France',
        'AU': 'Australia',
        'SG': 'Singapore',
        'HK': 'Hong Kong',
        'JP': 'Japan',
        'ZA': 'South Africa',
        'Other': 'Other'
    }
    
    if country not in valid_countries:
        return False, "Please select a valid country"
    
    return True, country

def check_duplicate_email(email: str) -> bool:
    """Check if email already exists in database"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute('SELECT id FROM leads WHERE email = ?', (email,))
    result = cursor.fetchone()
    
    conn.close()
    return result is not None

def save_lead_to_database(lead_data: Dict[str, Any]) -> Tuple[bool, str]:
    """Save validated lead data to database"""
    try:
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO leads (
                first_name, last_name, email, phone, company, job_title,
                country, investment_range, interests, how_heard, is_validated
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            lead_data['first_name'],
            lead_data['last_name'],
            lead_data['email'],
            lead_data['phone'],
            lead_data.get('company', ''),
            lead_data.get('job_title', ''),
            lead_data['country'],
            lead_data.get('investment_range', ''),
            lead_data.get('interests', ''),
            lead_data.get('how_heard', ''),
            True
        ))
        
        conn.commit()
        lead_id = cursor.lastrowid
        conn.close()
        
        logger.info(f"Lead saved successfully with ID: {lead_id}")
        return True, f"Lead registered successfully with ID: {lead_id}"
        
    except sqlite3.IntegrityError as e:
        if "UNIQUE constraint failed" in str(e):
            return False, "This email address is already registered"
        return False, "Database error occurred"
    except Exception as e:
        logger.error(f"Error saving lead: {str(e)}")
        return False, "An error occurred while saving your information"

@app.route('/backend/process_leads.py', methods=['POST'])
def process_lead_registration():
    """Handle lead registration form submissions"""
    try:
        # Get form data
        form_data = request.form.to_dict()
        
        # Initialize validation results
        validation_errors = {}
        validated_data = {}
        
        # Validate required fields
        # First Name
        is_valid, result = validate_name(form_data.get('first_name', ''), 'First name')
        if not is_valid:
            validation_errors['first_name'] = result
        else:
            validated_data['first_name'] = result
        
        # Last Name
        is_valid, result = validate_name(form_data.get('last_name', ''), 'Last name')
        if not is_valid:
            validation_errors['last_name'] = result
        else:
            validated_data['last_name'] = result
        
        # Email
        is_valid, result = validate_email(form_data.get('email', ''))
        if not is_valid:
            validation_errors['email'] = result
        else:
            # Check for duplicate email
            if check_duplicate_email(result):
                validation_errors['email'] = "This email address is already registered"
            else:
                validated_data['email'] = result
        
        # Phone
        is_valid, result = validate_phone(form_data.get('phone', ''))
        if not is_valid:
            validation_errors['phone'] = result
        else:
            validated_data['phone'] = result
        
        # Country
        is_valid, result = validate_country(form_data.get('country', ''))
        if not is_valid:
            validation_errors['country'] = result
        else:
            validated_data['country'] = result
        
        # Optional fields validation
        if form_data.get('company'):
            validated_data['company'] = clean_text(form_data['company'])
        
        if form_data.get('job_title'):
            validated_data['job_title'] = clean_text(form_data['job_title'])
        
        if form_data.get('investment_range'):
            valid_ranges = ['under_50k', '50k_100k', '100k_500k', '500k_1m', 'over_1m']
            if form_data['investment_range'] in valid_ranges:
                validated_data['investment_range'] = form_data['investment_range']
        
        if form_data.get('interests'):
            interests = clean_text(form_data['interests'])
            if len(interests) <= 1000:  # Limit length
                validated_data['interests'] = interests
        
        if form_data.get('how_heard'):
            valid_sources = ['search_engine', 'social_media', 'referral', 'news_article', 'event', 'other']
            if form_data['how_heard'] in valid_sources:
                validated_data['how_heard'] = form_data['how_heard']
        
        # If there are validation errors, return them
        if validation_errors:
            return jsonify({
                'success': False,
                'message': 'Please correct the errors below',
                'errors': validation_errors
            }), 400
        
        # Save to database
        success, message = save_lead_to_database(validated_data)
        
        if success:
            # Log successful registration
            logger.info(f"New lead registered: {validated_data['email']}")
            
            return jsonify({
                'success': True,
                'message': 'Thank you for your interest! We have received your registration and will contact you soon with exclusive investment opportunities.',
                'lead_id': message.split(': ')[1] if ': ' in message else None
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': message
            }), 400
            
    except Exception as e:
        logger.error(f"Error processing lead registration: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'An unexpected error occurred. Please try again later.'
        }), 500

@app.route('/backend/leads', methods=['GET'])
def get_leads():
    """Get all leads (for admin purposes)"""
    try:
        conn = sqlite3.connect(DATABASE_PATH)
        conn.row_factory = sqlite3.Row  # Enable dict-like access
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT * FROM leads 
            ORDER BY created_at DESC
        ''')
        
        leads = [dict(row) for row in cursor.fetchall()]
        conn.close()
        
        return jsonify({
            'success': True,
            'leads': leads,
            'total': len(leads)
        })
        
    except Exception as e:
        logger.error(f"Error fetching leads: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Error fetching leads'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'database': 'connected' if os.path.exists(DATABASE_PATH) else 'not_found'
    })

if __name__ == '__main__':
    # Initialize database on startup
    init_database()
    
    # Run the Flask app
    app.run(
        host='0.0.0.0',
        port=int(os.environ.get('PORT', 5000)),
        debug=os.environ.get('DEBUG', 'False').lower() == 'true'
    )
