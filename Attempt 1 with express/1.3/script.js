const diff = require('diff');
// Print incorrect sentences in red
function redIncorrect(originalSentence, modifiedSentence) {
  // Get the character differences using the diff library
  const differences = diffChars(originalSentence, modifiedSentence);

  let modifiedArray = [];

  // Process each difference
  differences.forEach((part) => {
    if (part.added) {
      // This character was added in the modified sentence
      modifiedArray.push(part.value);
    } else if (part.removed) {
      // This character was removed in the modified sentence
      modifiedArray.push(`<s style="text-decoration: line-through; color: red;">${part.value}</s>`);
    } else {
      // Characters match, add to the modified array
      modifiedArray.push(part.value);
    }
  });

  // Join the modified array into a string
  const redWrong = modifiedArray.join('');

  return redWrong;
}

// Print correct sentences in green
function greenCorrect(templateSentence, templateSentenceCopy) {
  // Compute the differences between the two strings
  const diffs = diffChars(templateSentence, templateSentenceCopy);

  // Initialize the result string
  let greenCor = '';

  for (const part of diffs) {
    if (part.added) {
      // Added text, check if it's a space or other character
      const formattedText = part.value === ' ' ? '<span style="color: #00ff00; text-decoration: underline;">_</span>' : `<span style="color: #00ff00;">${part.value}</span>`;
      greenCor += formattedText;
    } else if (!part.removed) {
      // Unchanged text, add it as-is
      greenCor += part.value;
    }
  }
  return greenCor;
}

function textModify(red_result, green_result) {
  const result = `${red_result}<br>${green_result}`;
  return result;
}





