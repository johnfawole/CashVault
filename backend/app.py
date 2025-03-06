from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import re
from datetime import datetime

app = Flask(__name__)
CORS(app)

def extract_current_date(text):
    date_match = re.search(r"(January|February|March|April|May|June|July|August|September|October|November|December) (\d{1,2})(st|nd|rd|th)", text)
    if date_match:
        month, day, _ = date_match.groups()
        return f"{datetime.now().year}-{datetime.strptime(month, '%B').month:02d}-{int(day):02d}"
    return None

def extract_transactions_from_pdf(file):
    try:
        reader = PyPDF2.PdfReader(file)
        transactions = []

        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text = page.extract_text()
            lines = text.split('\n')

            current_date = extract_current_date(text)

            for line in lines:
                # Example parsing logic (you need to adjust this based on your PDF format)
                if 'Transaction' in line:
                    parts = line.split()
                    time = parts[1]
                    amount = float(parts[2].replace('$', ''))
                    trans_type = parts[3]
                    recipient = parts[4]
                    description = ' '.join(parts[5:-1])
                    balance = float(parts[-1].replace('$', ''))
                    transactions.append({
                        'date': current_date,
                        'time': time,
                        'amount': amount,
                        'type': trans_type,
                        'recipient': recipient,
                        'description': description,
                        'balance': balance
                    })

        return transactions
    except Exception as e:
        raise ValueError(f"Error processing PDF file: {str(e)}")

def categorize_transactions(transactions):
    categories = {
        'Rent': ['rent', 'lease'],
        'Groceries': ['grocery', 'supermarket'],
        'Utilities': ['utility', 'electric', 'water'],
        'Entertainment': ['movie', 'concert', 'entertainment']
    }

    categorized_data = {category: 0 for category in categories}

    for transaction in transactions:
        for category, keywords in categories.items():
            if any(keyword in transaction['description'].lower() for keyword in keywords):
                categorized_data[category] += transaction['amount']
                break

    return categorized_data

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'bankStatement' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['bankStatement']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        transactions = extract_transactions_from_pdf(file)
        categorized_data = categorize_transactions(transactions)

        data = {
            'labels': list(categorized_data.keys()),
            'datasets': [{
                'data': list(categorized_data.values()),
                'backgroundColor': ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733']
            }]
        }

        return jsonify(data)
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)