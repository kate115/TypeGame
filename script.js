const sentences = [
    'Happier is better, worst would be sad.',
    'Helping hands would be a vast blast of fun energy.',
    'If you take a chance, take a helping hand!',
    'Love is the most powerful force in the world, makes bonds.'
]
let words = [];
let wordIndex = 0;

let startTime = Date.now();

const sentenceElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', () => {
    const quoteIndex = Math.floor(Math.random() * sentences.length);
    const quote = sentences[quoteIndex];

    words = quote.split(' ');

    wordIndex = 0;

    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    sentenceElement.innerHTML = spanWords.join('');
    sentenceElement.childNodes[0].className = 'highlight';
    messageElement.innerText = '';

    typedValueElement.value = '';
    typedValueElement.focus();
    startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex]
    const typedValue = typedValueElement.value;
    if (typedValue === currentWord && wordIndex === words.length - 1) {
        const elapsedTime = new Date().getTime() - startTime;
        const message = `Hooray! You're a star! You finished in ${elapsedTime / 1000} seconds!`
        messageElement.innerText = message;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        typedValueElement.value = '';
        wordIndex++;
        for (const wordElement of sentenceElement.childNodes) {
            wordElement.className = '';
        }
        sentenceElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        typedValueElement.className = '';
      } else {
        typedValueElement.className = 'error';
      }
});