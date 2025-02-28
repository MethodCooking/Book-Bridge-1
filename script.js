// Configuration
const CONFIG = {
    bookBridgeUrl: 'https://chat.openai.com/g/g-Qf4YngQAZ-book-bridge',
    copyButtonText: 'Copy Prompt',
    copiedButtonText: 'Copied!',
    copyTimeout: 2000,
};

// DOM Elements
const copyButton = document.getElementById('copy-button');
const appButton = document.getElementById('app-button');
const promptText = document.getElementById('prompt-text');

// Text cleaning function
function cleanText(text) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    
    let cleanedText = tempDiv.textContent;
    return cleanedText
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        .replace(/\r?\n/g, '\n')
        .replace(/[^\x20-\x7E\n]/g, '')
        .trim();
}

// Copy functionality
async function copyPrompt() {
    try {
        const textToCopy = cleanText(promptText.innerText);
        await navigator.clipboard.writeText(textToCopy);
        
        copyButton.classList.add('copied');
        const buttonText = copyButton.querySelector('.button-text');
        buttonText.textContent = CONFIG.copiedButtonText;
        
        appButton.disabled = false;
        
        setTimeout(() => {
            copyButton.classList.remove('copied');
            buttonText.textContent = CONFIG.copyButtonText;
        }, CONFIG.copyTimeout);
        
    } catch (err) {
        console.error('Failed to copy text:', err);
        alert('Failed to copy text. Please try again.');
    }
}

// Navigation functionality
function navigateToBookBridge() {  // Renamed this function
    window.open(CONFIG.bookBridgeUrl, '_blank');
}

// Event Listeners
copyButton.addEventListener('click', copyPrompt);
appButton.addEventListener('click', navigateToBookBridge);  // Updated here too

// Optional: Add keyboard accessibility
copyButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copyPrompt();
    }
});

appButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!appButton.disabled) {
            navigateToBookBridge();  // And here
        }
    }
});
