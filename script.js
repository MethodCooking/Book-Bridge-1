document.addEventListener('DOMContentLoaded', function() {
    const copyButton = document.getElementById('copy-button');
    const appButton = document.getElementById('app-button');
    const promptText = document.getElementById('prompt-text');
    const buttonText = copyButton.querySelector('.button-text');

    copyButton.addEventListener('click', async function() {
        try {
            await navigator.clipboard.writeText(promptText.textContent);
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
        console.log('Opening Book Bridge...');  // Add logging
        const url = 'https://chat.openai.com/g/g-Qf4YngQAZ-book-bridge';
        window.open(url, '_blank');
    });
});
