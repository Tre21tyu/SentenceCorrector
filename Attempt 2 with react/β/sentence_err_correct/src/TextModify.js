import { diffChars } from "diff";

function compareWords(original, modified) {
  // Split strings into words 
  const originalWords = original.split(" "); 
  const modifiedWords = modified.split(" ");

  // Compare words and calculate % changed
  const differences = []; 
  originalWords.forEach((word, index) => {
    if (index < modifiedWords.length) {
      const modifiedWord = modifiedWords[index];
      let diffPercentage = 0;
      if (word !== modifiedWord) {
        const diffCount = Math.abs(word.length - modifiedWord.length);
        diffPercentage = (diffCount / word.length) * 100; 
      }
      differences.push({
        originalWord: word,
        modifiedWord, 
        diffPercentage 
      });
    } else {
      // Extra word at the end of original
      differences.push({
        originalWord: word,
        modifiedWord: null, 
        diffPercentage: 100  
      });
    }
  });

  // Return word differences
  return differences; 
}

function redIncorrect(originalSentence, modifiedSentence) {

  const wordDiffs = compareWords(originalSentence, modifiedSentence);
  
  let result = "";

  wordDiffs.forEach(diff => {

    // Same word level diff logic as before

    result += " ";
  });

  // Post-process to handle inserts/edits  
  let currentRemove = "";
  const diffs = diffChars(originalSentence, modifiedSentence);

  diffs.forEach(part => {
    if (part.removed) {
      currentRemove += part.value; 
    } else if (part.added && currentRemove !== "") {
      // Convert to replace
      result += `<s style="text-decoration: line-through; color: red;">${currentRemove}</s>`;
      currentRemove = "";
    } else {
      if (currentRemove !== "") {
        result += `<s style="text-decoration: line-through; color: red;">${currentRemove}</s>`;
        currentRemove = "";
      }
      if (part.added) {
        result += part.value;  
      } else {
        result += part.value;
      }
    }
  });

  if (currentRemove !== "") {
    result += `<s style="text-decoration: line-through; color: red;">${currentRemove}</s>`;
  }

  return result;
}

function greenCorrect(templateSentence, templateSentenceCopy) {
  // Compute the differences between the two strings
  const diffs = diffChars(templateSentence, templateSentenceCopy);
  // Initialize the result string
  let result = "";

  for (const part of diffs) {
    if (part.added) {
      if (part.value.trim() === "") {
        // Identify consecutive spaces using a regular expression
        const consecutiveSpacesRegex = / +/g;
        // Replace consecutive spaces with the green underscore format
        const many_space = part.value.replace(
          consecutiveSpacesRegex,
          (match) => {
            return `<span style="color: #00ff00; text-decoration: underline;">${"_".repeat(
              match.length
            )}</span>`;
          }
        );
        result += many_space;
      } else {
        // Added text, check if it's a space or other character
        const formattedText = `<span style="color: #00ff00;">${part.value}</span>`;
        result += formattedText;
      }
    } else if (!part.removed) {
      // Unchanged text, add it as-is
      result += part.value;
    }
  }

  return result;
}

function textModify(red_result, green_result) {
  const result = `${redIncorrect(red_result, green_result)}<br>${greenCorrect(red_result, green_result)}`;
  return result;
}

export default textModify;
