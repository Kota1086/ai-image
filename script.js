const signalBtn = document.getElementById('signalBtn');
const resultDiv = document.getElementById('result');

signalBtn.addEventListener('click', async () => {
    resultDiv.innerText = 'Loading...';
    try {
        const response = await fetch('/api/signal');
        const data = await response.json();
        if (data.decision === 'ERROR') {
            resultDiv.innerText = 'Server Error. Try Again!';
        } else {
            resultDiv.innerText = `Signal: ${data.decision}`;
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerText = 'Error fetching signal.';
    }
});