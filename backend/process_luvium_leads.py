#!/usr/bin/env python3
"""
Luvium.co.za Lead Processing Flask API
Processes registration leads from luvium.co.za portal
"""
import os
import json
import smtplib
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

class LuviumLeadProcessor:
    """Process leads from luvium.co.za registration forms"""
    
    def __init__(self):
        self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', '587'))
        self.sender_email = os.getenv('SENDER_EMAIL', 'portal@luvium.co.za')
        self.sender_password = os.getenv('SENDER_PASSWORD', '')
        self.recipient_email = os.getenv('RECIPIENT_EMAIL', 'admin@luvium.co.za')
        self.data_dir = os.getenv('DATA_DIR', 'data/luvium')
        
        # Create data directory if it doesn't exist
        os.makedirs(self.data_dir, exist_ok=True)
    
    def validate_lead(self, lead_data):
        """Validate lead data"""
        required_fields = ['name', 'email', 'phone']
        
        for field in required_fields:
            if field not in lead_data or not lead_data[field]:
                logger.error(f"Missing required field: {field}")
                return False
        
        # Basic email validation
        if '@' not in lead_data['email'] or '.' not in lead_data['email']:
            logger.error(f"Invalid email format: {lead_data['email']}")
            return False
        
        return True
    
    def save_lead(self, lead_data):
        """Save lead to JSON file"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"{self.data_dir}/lead_{timestamp}_{lead_data.get('email', 'unknown')}.json"
        
        try:
            with open(filename, 'w') as f:
                json.dump(lead_data, f, indent=2)
            logger.info(f"Lead saved to {filename}")
            return True
        except Exception as e:
            logger.error(f"Failed to save lead: {str(e)}")
            return False
    
    def send_notification(self, lead_data):
        """Send email notification about new lead"""
        try:
            # Create message
            msg = MIMEMultipart()
            msg['From'] = self.sender_email
            msg['To'] = self.recipient_email
            msg['Subject'] = f"New Lead from luvium.co.za - {lead_data.get('name', 'Unknown')}"
            
            # Create email body
            body = f"""
            New Lead Registration from luvium.co.za
            ========================================
            
            Name: {lead_data.get('name', 'N/A')}
            Email: {lead_data.get('email', 'N/A')}
            Phone: {lead_data.get('phone', 'N/A')}
            Company: {lead_data.get('company', 'N/A')}
            Investment Interest: {lead_data.get('investment_interest', 'N/A')}
            Message: {lead_data.get('message', 'N/A')}
            
            Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
            
            Source: luvium.co.za Portal
            """
            
            msg.attach(MIMEText(body, 'plain'))
            
            # Send email
            if self.sender_password:
                with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                    server.starttls()
                    server.login(self.sender_email, self.sender_password)
                    server.send_message(msg)
                logger.info(f"Notification email sent to {self.recipient_email}")
            else:
                logger.warning("Email password not configured, skipping email notification")
            
            return True
        except Exception as e:
            logger.error(f"Failed to send notification: {str(e)}")
            return False
    
    def send_welcome_email(self, lead_data):
        """Send welcome email to the lead"""
        try:
            msg = MIMEMultipart()
            msg['From'] = self.sender_email
            msg['To'] = lead_data['email']
            msg['Subject'] = "Welcome to Luvium - Your Investment Journey Starts Here"
            
            body = f"""
            Dear {lead_data.get('name', 'Valued Client')},
            
            Thank you for your interest in Luvium!
            
            We have received your registration and one of our investment specialists will be in touch with you shortly to discuss your investment goals and opportunities.
            
            In the meantime, feel free to explore our investment products and resources on our website.
            
            If you have any immediate questions, please don't hesitate to reach out to us.
            
            Best regards,
            The Luvium Team
            
            ---
            Luvium - Building Wealth Together
            Web: https://luvium.co.za
            Email: info@luvium.co.za
            """
            
            msg.attach(MIMEText(body, 'plain'))
            
            if self.sender_password:
                with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                    server.starttls()
                    server.login(self.sender_email, self.sender_password)
                    server.send_message(msg)
                logger.info(f"Welcome email sent to {lead_data['email']}")
            else:
                logger.warning("Email password not configured, skipping welcome email")
            
            return True
        except Exception as e:
            logger.error(f"Failed to send welcome email: {str(e)}")
            return False
    
    def process_lead(self, lead_data):
        """Main lead processing function"""
        logger.info(f"Processing lead from {lead_data.get('email', 'unknown')}")
        
        # Validate lead
        if not self.validate_lead(lead_data):
            logger.error("Lead validation failed")
            return {'success': False, 'message': 'Invalid lead data'}
        
        # Add timestamp
        lead_data['timestamp'] = datetime.now().isoformat()
        lead_data['source'] = 'luvium.co.za'
        
        # Save lead
        if not self.save_lead(lead_data):
            logger.error("Failed to save lead")
            return {'success': False, 'message': 'Failed to save lead'}
        
        # Send notifications
        self.send_notification(lead_data)
        self.send_welcome_email(lead_data)
        
        logger.info("Lead processing completed successfully")
        return {'success': True, 'message': 'Lead processed successfully'}

@app.route('/process_luvium_leads', methods=['POST'])
def process_leads():
    """Flask API endpoint for processing leads"""
    try:
        processor = LuviumLeadProcessor()
        
        # Get JSON data from request
        lead_data = request.get_json()
        
        if not lead_data:
            return jsonify({'success': False, 'message': 'No data provided'}), 400
        
        result = processor.process_lead(lead_data)
        
        status_code = 200 if result['success'] else 400
        return jsonify(result), status_code
        
    except Exception as e:
        logger.error(f"API error: {str(e)}")
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'service': 'Luvium Lead Processing API'}), 200

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)
