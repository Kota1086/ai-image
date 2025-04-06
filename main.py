from flask import Flask, jsonify
import random

app = Flask(__name__)

@app.route('/api/signal/<pair>', methods=['GET'])
def get_signal(pair):
    directions = ['STRONG BUY 🟢', 'BUY 🟢', 'SELL 🔴', 'STRONG SELL 🔴']
    random_direction = random.choice(directions)
    return jsonify({'signal': random_direction})

if __name__ == '__main__':
    app.run(debug=True)