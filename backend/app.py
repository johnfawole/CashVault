from flask import Flask, request, jsonify
from flask_cors import CORS
import re
from collections import Counter

app = Flask(__name__)
CORS(app)

def extract_transactions(text):
    # Pattern: Send to <Name> ₦<Amount>
    sent_matches = re.findall(r'Send to ([A-Z\s\-]+)[^\d]*([\d,]+)', text, re.IGNORECASE)
    received_matches = re.findall(r'Received from ([A-Z\s\-]+)[^\d]*([\d,]+)', text, re.IGNORECASE)

    sent_totals = {}
    for name, amount in sent_matches:
        clean_amount = int(amount.replace(',', ''))
        sent_totals[name.strip()] = sent_totals.get(name.strip(), 0) + clean_amount

    received_totals = {}
    for name, amount in received_matches:
        clean_amount = int(amount.replace(',', ''))
        received_totals[name.strip()] = received_totals.get(name.strip(), 0) + clean_amount

    sent_data = [{'name': name, 'value': value} for name, value in sent_totals.items()]
    received_data = [{'name': name, 'value': value} for name, value in received_totals.items()]

    return sent_data, received_data

@app.route('/paste', methods=['POST'])
def paste():
    data = request.get_json()
    transactions = data.get('transactions', '')

    sent_data, received_data = extract_transactions(transactions)

    return jsonify({'sent': sent_data, 'received': received_data})

if __name__ == '__main__':
    app.run(debug=True)