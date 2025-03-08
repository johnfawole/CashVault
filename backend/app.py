from flask import Flask, request, jsonify
from flask_cors import CORS
import re
from collections import Counter

app = Flask(__name__)
CORS(app)

def extract_transactions(text):
    sent_names = re.findall(r'Send to ([A-Z\s-]+)', text, re.IGNORECASE)
    sent_counts = Counter(sent_names)

    received_names = re.findall(r'Received from ([A-Z\s-]+)', text, re.IGNORECASE)
    received_counts = Counter(received_names)

    sent_data = [{'name': name, 'value': count} for name, count in sent_counts.items()]
    received_data = [{'name': name, 'value': count} for name, count in received_counts.items()]

    return sent_data, received_data

@app.route('/paste', methods=['POST'])
def paste():
    data = request.get_json()
    transactions = data.get('transactions', '')

    sent_data, received_data = extract_transactions(transactions)

    return jsonify({'sent': sent_data, 'received': received_data})

if __name__ == '__main__':
    app.run(debug=True)