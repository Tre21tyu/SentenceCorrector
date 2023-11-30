import { diffChars } from "diff";

function redIncorrect(originalSentence, modifiedSentence) {
  // Get the character differences using the diff library
  const differences = diffChars(originalSentence, modifiedSentence);

  let modifiedArray = [];
  let currentPart = ""; // To store consecutive removed characters

  // Process each difference
  differences.forEach((part) => {
    if (part.added) {
      // This character was added in the modified sentence
      // We don't add added characters to the result
      if (currentPart) {
        modifiedArray.push(
          `<s style="text-decoration: line-through; color: red;">${currentPart}</s>`
        );
        currentPart = "";
      }
    } else if (part.removed) {
      // This character was removed in the modified sentence
      currentPart += part.value;
    } else {
      // Characters match, add to the modified array
      if (currentPart) {
        modifiedArray.push(
          `<s style="text-decoration: line-through; color: red;">${currentPart}</s>`
        );
        currentPart = "";
      }
      modifiedArray.push(part.value);
    }
  });

  // Join the modified array into a string
  const redWrong = modifiedArray.join("");

  return redWrong;
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

const result = 
`
  ${redIncorrect(red_result, green_result)}
  <br>
  ${greenCorrect(red_result, green_result)}
`;

  return result;
}
export default textModify;