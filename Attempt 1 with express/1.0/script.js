      // Get references to the HTML elements
      const pasteBtn = document.getElementById("pasteBtn");
      const copyBtn = document.getElementById("copyBtn");
      const finalizeBtn = document.getElementById("finalizeBtn");
      const sentenceField = document.getElementById("sentenceField");
      const correctionsField = document.getElementById("correctionsField");
      const correctedSentenceField = document.getElementById(
        "correctedSentenceField"
      );
      const exportBtn = document.getElementById("exportBtn"); // Add a reference to the "Export to Admonition" button

      let clipboardContent = "";

      // Check if the browser supports clipboard API
      if (navigator.clipboard) {
        // Add a click event listener to the "Paste from Clipboard" button
        pasteBtn.addEventListener("click", () => {
          if (clipboardContent) {
            sentenceField.value = clipboardContent;
            correctionsField.value = clipboardContent;
            correctedSentenceField.value = "";
          } else {
            navigator.clipboard
              .readText()
              .then((clipText) => {
                clipboardContent = clipText;
                sentenceField.value = clipText;
                correctionsField.value = clipText;
                correctedSentenceField.value = "";
              })
              .catch((error) => {
                console.error("Failed to read clipboard contents: ", error);
              });
          }
        });

        // Add a click event listener to the "Copy to Sentences" button
        copyBtn.addEventListener("click", () => {
          const correctionsText = correctionsField.value;
          sentenceField.value = correctionsText;
        });

        // Add a click event listener to the "Finalize Corrections" button
        finalizeBtn.addEventListener("click", () => {
          const sentenceText = sentenceField.value;
          const correctionsText = correctionsField.value;
          const correctedSentence = getCorrectedSentence(
            sentenceText,
            correctionsText
          );
          correctedSentenceField.value = correctedSentence;
        });

        // Function to get the corrected sentence with formatting
        function getCorrectedSentence(sentence, corrections) {
            const sentenceWords = sentence.split(" ");
            const correctionsWords = corrections.split(" ");
          
            let sentenceResult = "";
            let correctionsResult = "";
          
            for (
              let i = 0;
              i < sentenceWords.length || i < correctionsWords.length;
              i++
            ) {
              const sentenceWord = sentenceWords[i] || "";
              const correctionsWord = correctionsWords[i] || "";
          
              if (sentenceWord === correctionsWord) {
                sentenceResult += sentenceWord;
                correctionsResult += correctionsWord;
              } else {
                sentenceResult += `<s style="color: red;">${sentenceWord}</s>`;
                correctionsResult += `<font style="color: #00ff00;">${correctionsWord}</font>`;
              }
          
              if (i < sentenceWords.length - 1 || i < correctionsWords.length - 1) {
                sentenceResult += " ";
                correctionsResult += " ";
              }
            }
          
            return `
              <div>
                <p>Sentence: ${sentenceResult}</p>
                <p>Correction: ${correctionsResult}</p>
              </div>
            `;
          }
          
          // Example usage:
          const sentence = "The quick brown fox jumps over the lazy dog";
          const corrections = "The quick red fox jumps over the sleepy dog";
          
          const correctedText = getCorrectedSentence(sentence, corrections);
          console.log(correctedText);
          

        // Add a click event listener to the "Export to Admonition" button
        exportBtn.addEventListener("click", () => {
          const sentence = sentenceField.value || "insert sentence here";
          const correctedSentence =
            correctedSentenceField.value || "insert corrected sentence here";
          const comments = commentsField.value || "insert comments here";
          const admonitionContent = `\`\`\`\`ad-info
icon: edit
title: Sentence correction
color: 203, 187, 175
${sentence}
${correctedSentence}
\`\`\`ad-note
color: 203, 200, 124
${comments}
\`\`\`\``;

          // Copy the formatted content to the clipboard
          navigator.clipboard
            .writeText(admonitionContent)
            .then(() => {
              alert("Content copied to clipboard in Admonition format.");
            })
            .catch((error) => {
              console.error("Failed to copy content to clipboard: ", error);
            });
        });
      } else {
        console.error("Clipboard API not supported in this browser.");
      }