// Configuration
const CONFIG = {
    cookingAppUrl: 'https://chatgpt.com/g/g-20Ce4z9Ee-method-cooking', // Replace with actual cooking app URL
    copyButtonText: 'Copy Prompt',
    copiedButtonText: 'Copied!',
    copyTimeout: 2000, // Time in ms to show "Copied!" text
};

// DOM Elements
const copyButton = document.getElementById('copy-button');
const appButton = document.getElementById('app-button');
const promptText = document.getElementById('prompt-text');

// Copy functionality
async function copyPrompt() {
    try {
        await navigator.clipboard.writeText(promptText.textContent);
        
        // Visual feedback for copy success
        copyButton.classList.add('copied');
        const buttonText = copyButton.querySelector('.button-text');
        buttonText.textContent = CONFIG.copiedButtonText;
        
        // Enable the app button
        appButton.disabled = false;
        
        // Reset copy button after timeout
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
function navigateToCookingApp() {
    window.open(CONFIG.cookingAppUrl, '_blank');
}

// Event Listeners
copyButton.addEventListener('click', copyPrompt);
appButton.addEventListener('click', navigateToCookingApp);

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
            navigateToCookingApp();
        }
    }
});
