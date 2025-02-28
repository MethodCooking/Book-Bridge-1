document.addEventListener('DOMContentLoaded', function() {
    const CONFIG = {
        appUrl: 'chatgpt://g/g-20Ce4z9Ee-method-cooking',
        webUrl: 'https://chat.openai.com/g/g-20Ce4z9Ee-method-cooking',
        copyTimeout: 2000
    };

    const copyButton = document.getElementById('copy-button');
    const appButton = document.getElementById('app-button');
    const promptText = document.getElementById('prompt-text');
    const buttonText = copyButton.querySelector('.button-text');

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

    copyButton.addEventListener('click', async function() {
        try {
            const textToCopy = cleanText(promptText.innerText);
            await navigator.clipboard.writeText(textToCopy);
            copyButton.classList.add('copied');
            buttonText.textContent = 'Copied!';
            appButton.disabled = false;
            
            setTimeout(() => {
                copyButton.classList.remove('copied');
                buttonText.textContent = 'Copy Prompt';
            }, CONFIG.copyTimeout);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });

    appButton.addEventListener('click', function() {
        // Try to open in ChatGPT app first
        window.location.href = CONFIG.appUrl;
        
        // Fallback to web version after a short delay
        setTimeout(() => {
            window.open(CONFIG.webUrl, '_blank');
        }, 1000);
    });
});
