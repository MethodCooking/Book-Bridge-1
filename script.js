document.addEventListener('DOMContentLoaded', function() {
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
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });

    appButton.addEventListener('click', function() {
        // Try to detect if user is on iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const url = isIOS 
            ? 'https://apps.apple.com/app/chatgpt/id6448311069?gptId=g-20Ce4z9Ee-method-cooking'
            : 'https://chat.openai.com/g/g-20Ce4z9Ee-method-cooking';
            
        window.open(url, '_blank');
    });
});
