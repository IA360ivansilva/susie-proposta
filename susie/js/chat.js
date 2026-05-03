function toggleChat() {
    const chatWidget = document.getElementById('chat-widget');
    chatWidget.classList.toggle('chat-closed');
}

// Função para falar com voz humana brasileira (Luciana/Siri)
function speakNatural(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Carrega todas as vozes
        const voices = window.speechSynthesis.getVoices();
        
        // Busca especificamente vozes do BRASIL (pt-BR) e evita Portugal (pt-PT)
        // Prioriza vozes conhecidas por serem boas no Mac
        const brVoice = voices.find(v => v.lang === 'pt-BR' && v.name.includes('Luciana')) || 
                        voices.find(v => v.lang === 'pt-BR' && v.name.includes('Siri')) ||
                        voices.find(v => v.lang === 'pt-BR' && v.name.includes('Joana')) ||
                        voices.find(v => v.lang === 'pt-BR'); // Qualquer uma brasileira
        
        if (brVoice) {
            utterance.voice = brVoice;
        }
        
        utterance.lang = 'pt-BR'; // Força PT-BR
        utterance.rate = 0.95; 
        utterance.pitch = 1.0;
        
        window.speechSynthesis.speak(utterance);
    }
}

// Garante que as vozes sejam detectadas no carregamento
window.speechSynthesis.onvoiceschanged = function() {
    window.speechSynthesis.getVoices();
};

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const message = userInput.value.trim();

    if (message === '') return;

    // Mensagem do Usuário
    const userDiv = document.createElement('div');
    userDiv.className = 'message user';
    userDiv.textContent = message;
    chatMessages.appendChild(userDiv);

    userInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Efeito de Digitação Premium
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing';
    typingDiv.textContent = 'Susie Greene está digitando...';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Resposta com Voz Humana Natural
    setTimeout(() => {
        chatMessages.removeChild(typingDiv);
        const botDiv = document.createElement('div');
        botDiv.className = 'message bot';
        
        const botResponse = "Olá! Sou o assistente da Susie Greene. Aqui na Flórida, ajudamos você a ter proteção com 'Living Benefits', para você usar o dinheiro do seguro em vida. Quer agendar uma conversa com a Susie?";
        
        botDiv.textContent = botResponse;
        chatMessages.appendChild(botDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Executa a voz natural do sistema lendo o texto correto
        speakNatural(botResponse);
        
    }, 1500);
}

// Permitir enviar com Enter
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
