import { diffChars } from 'diff';

function greenCorrect(templateSentence, templateSentenceCopy) {
    // Compute the differences between the two strings
    const diffs = diffChars(templateSentence, templateSentenceCopy);

    // Initialize the result string
    let result = '';

    for (const part of diffs) {
        if (part.added) {
            if (part.value.trim() === '') {
                // Identify consecutive spaces using a regular expression
                const consecutiveSpacesRegex = / +/g;

                // Replace consecutive spaces with the green underscore format
                const many_space = part.value.replace(consecutiveSpacesRegex, match => {
                    return `<span style="color: #00ff00; text-decoration: underline;">${'_'.repeat(match.length)}</span>`;
                });

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
