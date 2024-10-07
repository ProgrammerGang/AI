const API_KEY = 'GJmUMley42By1fIp9jXqRrtFUgKpwG0JHliDSuUx'; // Replace with your Cohere API key

document.getElementById('send-button').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    addMessage('You: ' + userInput);
    document.getElementById('user-input').value = '';

    const response = await getAIResponse(userInput);
    addMessage('Bot: ' + response);
});

function addMessage(message) {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += '<div>' + message + '</div>';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function getAIResponse(input) {
    const response = await fetch('https://api.cohere.ai/generate', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: input,
            model: 'command-xlarge-20221108',
            max_tokens: 50,
            temperature: 0.9
        })
    });
    const data = await response.json();
    return data.generations[0].text.trim();
}
