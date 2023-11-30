// Import the 'diffChars' function from the 'diff' module
import { diffChars } from "diff";

// Function to compare words in two sentences and calculate the percentage of differences
function compareWords(original, modified) {
  // Split the input sentences into arrays of words
  const originalWords = original.split(" ");
  const modifiedWords = modified.split(" ");

  // Initialize an array to store word differences
  const differences = [];

  // Loop through each word in the original sentence
  originalWords.forEach((word, index) => {
    // Check if there is a corresponding word in the modified sentence
    if (index < modifiedWords.length) {
      const modifiedWord = modifiedWords[index];
      let diffPercentage = 0;

      // Compare the words and calculate the percentage of differences
      if (word !== modifiedWord) {
        const diffCount = Math.abs(word.length - modifiedWord.length);
        diffPercentage = (diffCount / word.length) * 100;
      }

      // Store the word differences in the array
      differences.push({
        originalWord: word,
        modifiedWord,
        diffPercentage,
      });
    } else {
      // Handle the case of an extra word at the end of the original sentence
      differences.push({
        originalWord: word,
        modifiedWord: null,
        diffPercentage: 100,
      });
    }
  });

  // Return the array of word differences
  return differences;
}

// Function to format and highlight incorrectly spelled words in red
function redIncorrect(originalSentence, modifiedSentence) {
  // Get the word differences between the original and modified sentences
  const wordDiffs = compareWords(originalSentence, modifiedSentence);

  // Initialize an empty string to store the formatted result
  let result = "";

  // Loop through each word difference
  wordDiffs.forEach((diff) => {
    // Append a space to the result string (current implementation does not modify the result)
    result += " ";
  });

  // Initialize variables to track removed text
  let currentRemove = "";

  // Get character differences between the original and modified sentences
  const diffs = diffChars(originalSentence, modifiedSentence);

  // Loop through each character difference
  diffs.forEach((part) => {
    // If a character is removed, add it to the 'currentRemove' variable
    if (part.removed) {
      currentRemove += part.value;
    } else if (part.added && currentRemove !== "") {
      // If an added character is encountered after removed characters,
      // format the removed characters with strikethrough and red color
      result += `<s style="text-decoration: line-through; color: red;">${currentRemove}</s>`;
      currentRemove = "";
    } else {
      // If there are no removed characters, simply add the current character to the result
      if (currentRemove !== "") {
        result += `<s style="text-decoration: line-through; color: red;">${currentRemove}</s>`;
        currentRemove = "";
      }

      // If the character is added, include it in the result
      if (part.added) {
        result += part.value;
      } else {
        result += part.value;
      }
    }
  });

  // If there are remaining removed characters, format them and add to the result
  if (currentRemove !== "") {
    result += `<s style="text-decoration: line-through; color: red;">${currentRemove}</s>`;
  }

  // Return the formatted result
  return result;
}

// Function to format and highlight correctly spelled words in green
function greenCorrect(templateSentence, templateSentenceCopy) {
  // Get character differences between the two sentences
  const diffs = diffChars(templateSentence, templateSentenceCopy);

  // Initialize an empty string to store the formatted result
  let result = "";

  // Loop through each character difference
  for (const part of diffs) {
    // If a character is added, format it in green
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

        // Add the formatted text to the result
        result += many_space;
      } else {
        // If added text is not a space, format it in green
        const formattedText = `<span style="color: #00ff00;">${part.value}</span>`;
        result += formattedText;
      }
    } else if (!part.removed) {
      // If the character is unchanged, add it to the result as-is
      result += part.value;
    }
  }

  // Return the formatted result
  return result;
}

// Function to combine the redIncorrect and greenCorrect results with line break
function textModify(red_result, green_result) {
  const result = `${redIncorrect(red_result, green_result)}<br>${greenCorrect(red_result, green_result)}`;
  return result;
}

// Export the textModify function as the default export of the module
export default textModify;
