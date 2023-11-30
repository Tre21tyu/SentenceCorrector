import { diffChars } from 'diff';

function redIncorrect(originalSentence, modifiedSentence) {
  // Get the character differences using the diff library
  const differences = diffChars(originalSentence, modifiedSentence);

  let modifiedArray = [];
  let currentPart = ''; // To store consecutive removed characters

  // Process each difference
  differences.forEach((part) => {
    if (part.added) {
      // This character was added in the modified sentence
      // We don't add added characters to the result
      if (currentPart) {
        modifiedArray.push(`<s style="text-decoration: line-through; color: red;">${currentPart}</s>`);
        currentPart = '';
      }
    } else if (part.removed) {
      // This character was removed in the modified sentence
      currentPart += part.value;
    } else {
      // Characters match, add to the modified array
      if (currentPart) {
        modifiedArray.push(`<s style="text-decoration: line-through; color: red;">${currentPart}</s>`);
        currentPart = '';
      }
      modifiedArray.push(part.value);
    }
  });

  // Join the modified array into a string
  const redWrong = modifiedArray.join('');

  return redWrong;
}