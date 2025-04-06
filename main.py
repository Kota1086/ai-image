# main.py (Combined Backend)
import asyncio
import websockets
import json
import numpy as np
import pandas as pd
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from ta.momentum import RSIIndicator
from ta.volatility import BollingerBands
import subprocess  # For Java integration

class TradingBot:
    def __init__(self):
        self.model = self.build_model()
        self.last_data = pd.DataFrame()

    def build_model(self):
        model = Sequential([
            LSTM(50, return_sequences=True, input_shape=(60, 6)),
            LSTM(50),
            Dense(3, activation='softmax')
        ])
        model.compile(optimizer='adam', loss='categorical_crossentropy')
        return model

    def preprocess_data(self, data):
        rsi = RSIIndicator(data['close']).rsi()
        bb = BollingerBands(data['close'])
        features = pd.DataFrame({
            'open': data['open'],
            'high': data['high'],
            'low': data['low'],
            'close': data['close'],
            'rsi': rsi,
            'bb_band': bb.bollinger_hband() - bb.bollinger_lband()
        })
        return features.fillna(0).values.reshape(-1, 60, 6)

    def detect_patterns(self, data):
        patterns = []
        closes = data['close'].values
        if len(closes) > 3:
            if abs(closes[-3] - closes[-1]) < 0.0001:
                patterns.append('channel')
            body = abs(data['open'].iloc[-1] - data['close'].iloc[-1])
            range_ = data['high'].iloc[-1] - data['low'].iloc[-1]
            if body/range_ < 0.1:
                patterns.append('doji')
        return patterns

    async def handler(self, websocket):
        while True:
            # Generate mock data (replace with real feed)
            mock_data = pd.DataFrame({
                'open': np.random.normal(1.12, 0.01, 60),
                'high': np.random.normal(1.125, 0.01, 60),
                'low': np.random.normal(1.115, 0.01, 60),
                'close': np.random.normal(1.12, 0.01, 60)
            })
            
            processed = self.preprocess_data(mock_data)
            prediction = self.model.predict(processed)
            patterns = self.detect_patterns(mock_data)
            
            signal = 'HOLD'
            if 'channel' in patterns and prediction[0][0] > 0.7:
                signal = 'BUY'
            elif 'doji' in patterns and prediction[0][1] > 0.7:
                signal = 'SELL'

            # Java Risk Check
            risk_result = subprocess.check_output(
                ['java', 'RiskManager', signal],
                text=True
            ).strip()
            
            if "APPROVED" in risk_result:
                chart_data = [{
                    'x': list(range(60)),
                    'open': mock_data['open'].tolist(),
                    'high': mock_data['high'].tolist(),
                    'low': mock_data['low'].tolist(),
                    'close': mock_data['close'].tolist(),
                    'type': 'candlestick'
                }]
                
                await websocket.send(json.dumps({
                    'chart': chart_data,
                    'signal': signal,
                    'risk_status': risk_result
                }))
            
            await asyncio.sleep(60)

async def main():
    bot = TradingBot()
    async with websockets.serve(bot.handler, "localhost", 8000):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())