from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2

app = Flask(__name__)
CORS(app)

def extract_transactions_from_pdf(file):
    reader = PyPDF2.PdfReader(file)
    transactions = []

    for page_num in range(len(reader.pages)):
        page = reader.pages[page_num]
        text = page.extract_text()
        lines = text.split('\n')

        for line in lines:
            # Example parsing logic (you need to adjust this based on your PDF format)
            if 'Transaction' in line:
                parts = line.split()
                date = parts[0]
                description = ' '.join(parts[1:-1])
                amount = float(parts[-1].replace('$', ''))
                transactions.append({'date': date, 'description': description, 'amount': amount})

    return transactions

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
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)