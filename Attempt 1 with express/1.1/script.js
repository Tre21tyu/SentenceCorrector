// Get references to the HTML elements
const pasteBtn = document.getElementById("pasteBtn");
const copyBtn = document.getElementById("copyBtn");
const finalizeBtn = document.getElementById("finalizeBtn");
const sentenceField = document.getElementById("sentenceField");
const correctionsField = document.getElementById("correctionsField");
const correctedSentenceField = document.getElementById("correctedSentenceField");
const exportBtn = document.getElementById("exportBtn");

// Function to find missing and added letters and words between two sentences
function findMissingAndAdded(templateSentence, sentence) {
  const templateWords = templateSentence.split(' ');
  const sentenceWords = sentence.split(' ');
  const rRmv = [];
  const gAdd = [];

  for (let i = 0; i < templateWords.length; i++) {
    const templateWord = templateWords[i];
    const word = sentenceWords[i];

    const missingLetters = [];
    const addedLetters = [];
    const missingWords = [];
    const addedWords = [];

    // Compare the template word and the word from the sentence
    for (let j = 0; j < templateWord.length; j++) {
      const letter = templateWord[j];
      if (!word.includes(letter)) {
        missingLetters.push(letter);
      }
    }

    for (let j = 0; j < word.length; j++) {
      const letter = word[j];
      if (!templateWord.includes(letter)) {
        addedLetters.push(letter);
      }
    }

    // Find missing and added words
    if (!templateWords.includes(word)) {
      addedWords.push(word);
    }
    if (!sentenceWords.includes(templateWord)) {
      missingWords.push(templateWord);
    }

    // Format missing letters for rRmv
    if (missingLetters.length > 1) {
      const formattedWord = missingLetters.map(letter => `<s style="text-decoration: line-through; color: red;">${letter}</s>`).join('');
      rRmv.push(formattedWord);
    } else {
      rRmv.push(templateWord);
    }

    // Format added letters for gAdd
    if (addedLetters.length > 1) {
      const formattedWord = addedLetters.map(letter => `<font style="color: #00ff00;">${letter}</font>`).join('');
      gAdd.push(formattedWord);
    } else {
      gAdd.push(word);
    }
  }

  return { rRmv, gAdd, missingWords, addedWords };
}

// Event listener for the "Paste from Clipboard" button
pasteBtn.addEventListener("click", function() {
  // Attempt to paste from clipboard
  navigator.clipboard.readText()
    .then(function(clipboardText) {
      // Paste the clipboard content into both Sentence and Corrections fields
      sentenceField.value = clipboardText;
      correctionsField.value = clipboardText;
    })
    .catch(function(error) {
      console.error('Failed to read clipboard contents: ', error);
    });
});

// Event listener for the "Copy to Sentences" button
copyBtn.addEventListener("click", function() {
  // Copy text from Corrections Field to Sentence Field
  sentenceField.value = correctionsField.value;
});

// Event listener for the "Finalize Corrections" button
finalizeBtn.addEventListener("click", function() {
  // Get the content of the Sentence and Corrections fields
  const templateSentence = sentenceField.value;
  const sentence = correctionsField.value;

  // Use the findMissingAndAdded function to find differences
  const { rRmv, gAdd, missingWords, addedWords } = findMissingAndAdded(templateSentence, sentence);

  // Display the results in the Corrected Sentences field
  correctedSentenceField.innerHTML = `${rRmv.join(' ')}<br>${gAdd.join(' ')}<br>Missing Words: ${missingWords.join(', ')}<br>Added Words: ${addedWords.join(', ')}`;
});
