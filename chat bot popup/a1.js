const auroraChatToggle = document.getElementById('aurora-chat-toggle');
const auroraChatContainer = document.getElementById('aurora-chat-container');
const auroraChatClose = document.getElementById('aurora-chat-close');
const auroraChatMessages = document.getElementById('aurora-chat-messages');
const auroraChatInput = document.getElementById('aurora-chat-input');
const auroraChatSend = document.getElementById('aurora-chat-send');

auroraChatToggle.addEventListener('click', toggleAuroraChat);
auroraChatClose.addEventListener('click', toggleAuroraChat);
auroraChatSend.addEventListener('click', sendAuroraMessage);
auroraChatInput.addEventListener('keypress', handleAuroraEnter);
auroraChatInput.addEventListener('input', adjustAuroraInputHeight);
auroraChatMessages.addEventListener('click', function(event) {
    if (event.target.classList.contains('aurora-link')) {
        handleAuroraLinkClick(event);
    }
});

function toggleAuroraChat() {
    const isVisible = auroraChatContainer.style.display === 'block';
    auroraChatContainer.style.display = isVisible ? 'none' : 'block';
    auroraChatToggle.style.display = isVisible ? 'flex' : 'none';
}

function sendAuroraMessage() {
    const message = auroraChatInput.value.trim();
    if (message) {
        addAuroraMessage(message, 'sent');
        auroraChatInput.value = '';
        adjustAuroraInputHeight();
        setTimeout(() => {
            const response = getAuroraResponse(message);
            addAuroraMessage(response, 'received');
        }, 1000);
    }
}

function handleAuroraEnter(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendAuroraMessage();
    }
}

function adjustAuroraInputHeight() {
    auroraChatInput.style.height = 'auto';
    auroraChatInput.style.height = auroraChatInput.scrollHeight + 'px';
}

function addAuroraMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('aurora-chat-message', type);
    messageElement.innerHTML = message;
    auroraChatMessages.appendChild(messageElement);
    auroraChatMessages.scrollTop = auroraChatMessages.scrollHeight;
}

function getAuroraResponse(message) {
    const responses = [
        `I've analyzed your query. You might find this information helpful: <a href='#' class='aurora-link' data-href='https://www.example.com/info'>Explore Further</a>`,
        `Interesting question! I've compiled some relevant data here: <a href='#' class='aurora-link' data-href='https://www.example.com/data'>View Analysis</a>`,
        `Based on your input, I recommend checking out this resource: <a href='#' class='aurora-link' data-href='https://www.example.com/resource'>Learn More</a>`,
        `I've processed your request. This link might provide additional context: <a href='#' class='aurora-link' data-href='https://www.example.com/context'>Detailed Insights</a>`,
        `Your inquiry is intriguing. I've found some relevant information here: <a href='#' class='aurora-link' data-href='https://www.example.com/discover'>Discover More</a>`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function handleAuroraLinkClick(event) {
    event.preventDefault();
    const href = event.target.getAttribute('data-href');
    if (href) {
        window.open(href, '_blank');
    }
}