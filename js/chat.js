document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const recipientSelect = document.getElementById('recipientSelect');

    sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        const recipient = recipientSelect.value;
        if (message && recipient) {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                sendMessage(user.email, recipient, message);
                chatInput.value = '';
            } else {
                alert('You must be logged in to send a message.');
            }
        }
    });

    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

    function sendMessage(sender, recipient, message) {
        const messageData = {
            sender: sender,
            recipient: recipient,
            message: message,
            timestamp: new Date().toISOString()
        };

        fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(messageData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Message sent:', data);
            location.reload(); // Reload the page after sending a message
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
    }

    function fetchMessages() {
        fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
                'Cache-Control': 'no-cache'
            }
        })
        .then(response => response.json())
        .then(data => {
            data.forEach(messageData => {
                addMessage(messageData.sender, messageData.message);
            });
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
        });
    }

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.innerHTML = `<span class="sender">${sender}:</span> <span class="message">${message}</span>`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Fetch existing messages when the page loads
    fetchMessages();
});