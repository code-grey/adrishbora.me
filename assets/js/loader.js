document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById('loader');
    const textElement = document.getElementById('loader-text');
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}[]|;:,.<>?";

    // Sequence of messages to display
    const messages = ["INITIALIZING...", "CONNECTING TO SERVER...", "DECRYPTING DATA...", "ACCESS GRANTED"];
    let currentMessageIndex = 0;

    function scrambleText(targetText, callback) {
        let iterations = 0;
        const interval = setInterval(() => {
            textElement.innerText = targetText
                .split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return targetText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            if (iterations >= targetText.length) {
                clearInterval(interval);
                if (callback) callback();
            }

            iterations += 1 / 2; // Speed of decryption
        }, 30);
    }

    function playSequence() {
        if (currentMessageIndex < messages.length) {
            scrambleText(messages[currentMessageIndex], () => {
                setTimeout(() => {
                    currentMessageIndex++;
                    playSequence();
                }, 500); // Pause between messages
            });
        } else {
            // Animation complete
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 1000); // Wait for fade out transition
            }, 500);
        }
    }

    playSequence();
});
