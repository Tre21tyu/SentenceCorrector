document.addEventListener("DOMContentLoaded", function () {
  const templateSentenceInput = document.getElementById("template-sentence");
  const templateSentenceCopyInput = document.getElementById(
    "template-sentence-copy"
  );
  const confirmLockBtn = document.getElementById("confirm-lock-btn");
  const unlockBtn = document.getElementById("unlock-btn");
  const finalizeCorrectionsBtn = document.getElementById(
    "finalize-corrections-btn"
  );
  const correctedSentencesInput = document.getElementById(
    "corrected-sentences"
  );
  const copyToClipboardBtn = document.getElementById("copy-to-clipboard-btn");

  // Function to copy the content from Template Sentence to Template Sentence Copy
  function copyTemplateToCopy() {
    templateSentenceCopyInput.value = templateSentenceInput.value;
    templateSentenceInput.readOnly = true;
    templateSentenceCopyInput.readOnly = false;
    confirmLockBtn.disabled = true;
    unlockBtn.disabled = false;
    finalizeCorrectionsBtn.style.display = "block";
  }

  // Function to unlock the Template Sentence
  function unlockTemplate() {
    templateSentenceInput.readOnly = false;
    confirmLockBtn.disabled = false;
    unlockBtn.disabled = true;
    templateSentenceCopyInput.readOnly = true;
    finalizeCorrectionsBtn.style.display = "none";
    templateSentenceCopyInput.value = ""; // Clear Template Sentence Copy when unlocked
  }

  // Function to finalize corrections
  function finalizeCorrections() {
    const originalSentence = templateSentenceInput.value;
    const modifiedSentence = templateSentenceCopyInput.value;
    const modifiedResult = modifySentenceWithDeletedCharacters(
      originalSentence,
      modifiedSentence
    );
    const greenSentenceResult = compareSentencesAndHighlightAdded(
      originalSentence,
      modifiedSentence
    );

    const combinedResult = modifiedResult + "<br>" + greenSentenceResult;
    correctedSentencesInput.value = combinedResult;

    // Log modifiedResult and greenSentenceResult
    console.log("Modified Result: " + modifiedResult);
    console.log("Green Sentence Result: " + greenSentenceResult);
  }

  // Function to copy text to clipboard
  function copyToClipboard() {
    correctedSentencesInput.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  }

  finalizeCorrectionsBtn.addEventListener("click", finalizeCorrections);
  confirmLockBtn.addEventListener("click", copyTemplateToCopy);
  unlockBtn.addEventListener("click", unlockTemplate);
  copyToClipboardBtn.addEventListener("click", copyToClipboard);

// Function to compare sentences and highlight added characters in green
// Function to compare sentences and highlight added characters in green
function compareSentencesAndHighlightAdded(originalSentence, modifiedSentence) {
    let greenArray = [];
    let i = 0;
    let j = 0;
    let inAddedSequence = false;

    while (i < originalSentence.length && j < modifiedSentence.length) {
        if (originalSentence[i] === modifiedSentence[j]) {
            // Characters match, end any open added sequence
            if (inAddedSequence) {
                greenArray.push('</span>');
                inAddedSequence = false;
            }
            greenArray.push(originalSentence[i]);
            i++;
            j++;
        } else {
            // Check if we're in the middle of a word
            if (i > 0 && originalSentence[i - 1] !== ' ' && modifiedSentence[j - 1] !== ' ') {
                // Characters don't match, but we're in the middle of a word, treat as part of the original sentence
                if (inAddedSequence) {
                    greenArray.push('</span>');
                    inAddedSequence = false;
                }
                greenArray.push(originalSentence[i]);
                i++;
            } else if (j > 0 && modifiedSentence[j - 1] !== ' ') {
                // Characters don't match, but we're in the middle of a word, treat as part of the modified sentence
                if (!inAddedSequence) {
                    greenArray.push('<span style="color: #00ff00;">');
                    inAddedSequence = true;
                }
                greenArray.push(modifiedSentence[j]);
                j++;
            } else {
                // Start an added sequence
                if (!inAddedSequence) {
                    greenArray.push('<span style="color: #00ff00;">');
                    inAddedSequence = true;
                }
                greenArray.push(modifiedSentence[j]);
                j++;
            }
        }
    }

    // End any open added sequence
    if (inAddedSequence) {
        greenArray.push('</span>');
    }

    // Append any remaining characters from the modified sentence
    while (j < modifiedSentence.length) {
        if (!inAddedSequence) {
            greenArray.push('<span style="color: #00ff00;">');
            inAddedSequence = true;
        }
        greenArray.push(modifiedSentence[j]);
        j++;
    }

    // Join the green array into a string
    const greenSentenceResult = greenArray.join('');

    return greenSentenceResult;
}



  // Function to modify sentence with deleted characters
  function modifySentenceWithDeletedCharacters(
    originalSentence,
    modifiedSentence
  ) {
    let modifiedArray = [];
    let i = 0;
    let j = 0;

    while (i < originalSentence.length && j < modifiedSentence.length) {
      if (originalSentence[i] !== modifiedSentence[j]) {
        // Add the deleted character with styling
        modifiedArray.push(
          `<s style="text-decoration: line-through; color: red;">${originalSentence[i]}</s>`
        );
        i++;
      } else {
        // Characters match, add to the modified array
        modifiedArray.push(originalSentence[i]);
        i++;
        j++;
      }
    }

    // Append any remaining characters from the original sentence
    while (i < originalSentence.length) {
      modifiedArray.push(
        `<s style="text-decoration: line-through; color: red;">${originalSentence[i]}</s>`
      );
      i++;
    }

    // Join the modified array into a string
    const modifiedResult = modifiedArray.join("");

    return modifiedResult;
  }
});
