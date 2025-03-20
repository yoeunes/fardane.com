/**
 * Simple text splitting utility (alternative to GSAP's SplitText)
 * @param {HTMLElement} element - The element containing text to split
 * @param {Object} options - Options for splitting
 * @returns {Object} - The split text elements
 */
export function splitText(element, options = {}) {
    const type = options.type || 'chars';
    const originalText = element.innerHTML;
    let result = {originalContent: originalText};

    // Store original content
    element.setAttribute('data-original-content', originalText);

    if (type.includes('chars')) {
        // Split into characters
        const chars = [];
        const text = element.textContent;
        element.innerHTML = '';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const charSpan = document.createElement('span');
            charSpan.className = 'split-char';
            charSpan.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
            element.appendChild(charSpan);
            chars.push(charSpan);
        }

        result.chars = chars;
    }

    if (type.includes('words')) {
        // Split into words
        const words = [];
        const textContent = element.textContent;
        const textWords = textContent.split(/\s+/);

        if (!type.includes('chars')) {
            element.innerHTML = '';

            textWords.forEach((word, index) => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'split-word';
                wordSpan.textContent = word;
                element.appendChild(wordSpan);

                if (index < textWords.length - 1) {
                    element.appendChild(document.createTextNode(' '));
                }

                words.push(wordSpan);
            });
        } else {
            // If we've already split into chars, find the word boundaries
            const chars = result.chars;
            let wordStart = 0;

            textWords.forEach(word => {
                const wordChars = [];
                for (let i = 0; i < word.length; i++) {
                    wordChars.push(chars[wordStart + i]);
                }

                words.push(wordChars);
                wordStart += word.length + 1; // +1 for the space
            });
        }

        result.words = words;
    }

    return result;
}
