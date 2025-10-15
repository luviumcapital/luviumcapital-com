import json
import re
from typing import Dict, List, Any

# Parse input data
try:
    data = json.loads(lead_data) if isinstance(lead_data, str) else lead_data
except:
    data = lead_data

# Handle both single record and list of records
if isinstance(data, dict):
    leads = [data]
elif isinstance(data, list):
    leads = data
else:
    leads = []

# Data cleaning, validation, and standardization functions
def clean_text(text):
    """Remove extra whitespace and trim"""
    if not text or not isinstance(text, str):
        return text
    return ' '.join(text.strip().split())

def validate_email(email):
    """Validate email format"""
    if not email:
        return False, email
    email = clean_text(str(email)).lower()
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    is_valid = bool(re.match(pattern, email))
    return is_valid, email

def validate_phone(phone):
    """Validate and standardize phone number"""
    if not phone:
        return False, phone
    # Remove non-numeric characters
    phone = re.sub(r'[^0-9+]', '', str(phone))
    # Check if valid length (10-15 digits)
    is_valid = 10 <= len(phone.replace('+', '')) <= 15
    return is_valid, phone

def standardize_name(name):
    """Standardize name to proper case"""
    if not name or not isinstance(name, str):
        return name
    name = clean_text(name)
    return name.title()

def standardize_company(company):
    """Standardize company name"""
    if not company or not isinstance(company, str):
        return company
    company = clean_text(company)
    # Keep original casing for companies but clean whitespace
    return company

# Process each lead
processed_leads = []
seen_emails = set()
validation_stats = {
    'total': len(leads),
    'processed': 0,
    'duplicates': 0,
    'invalid_emails': 0,
    'invalid_phones': 0
}

for lead in leads:
    if not isinstance(lead, dict):
        continue
    
    processed = {}
    
    # Clean and standardize first name
    if 'first_name' in lead:
        processed['first_name'] = standardize_name(lead['first_name'])
    
    # Clean and standardize last name
    if 'last_name' in lead:
        processed['last_name'] = standardize_name(lead['last_name'])
    
    # Validate and clean email
    if 'email' in lead:
        is_valid, email = validate_email(lead['email'])
        processed['email'] = email
        processed['email_valid'] = is_valid
        if not is_valid:
            validation_stats['invalid_emails'] += 1
        
        # Check for duplicates
        if email in seen_emails:
            validation_stats['duplicates'] += 1
            processed['is_duplicate'] = True
        else:
            seen_emails.add(email)
            processed['is_duplicate'] = False
    
    # Validate and clean phone
    if 'phone' in lead:
        is_valid, phone = validate_phone(lead['phone'])
        processed['phone'] = phone
        processed['phone_valid'] = is_valid
        if not is_valid:
            validation_stats['invalid_phones'] += 1
    
    # Standardize company name
    if 'company' in lead:
        processed['company'] = standardize_company(lead['company'])
    
    # Clean and standardize country
    if 'country' in lead:
        processed['country'] = standardize_name(lead['country'])
    
    # Copy other fields as-is but cleaned
    for key, value in lead.items():
        if key not in processed:
            if isinstance(value, str):
                processed[key] = clean_text(value)
            else:
                processed[key] = value
    
    processed_leads.append(processed)
    validation_stats['processed'] += 1

# Create output with processed data and statistics
result = {
    'processed_leads': processed_leads,
    'validation_stats': validation_stats,
    'status': 'success'
}

# Return as JSON string for export
json.dumps(result, indent=2)
