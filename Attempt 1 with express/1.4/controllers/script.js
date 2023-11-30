document.getElementById("myForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const tmp_sent = document.getElementById("tmp_sent").value;
  const tmp_sent_cpy = document.getElementById("tmp_sent_cpy").value;

  // Send a POST request to the server with JSON data.
  fetch("/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tmp_sent, tmp_sent_cpy }), // Send the text values as an object.
  })
    .then((response) => response.json())
    .then((data) => {
      // Display the result in the "result" div.
      document.getElementById("result").textContent = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// document.addEventListener('DOMContentLoaded', function () {
//   const templateSentenceInput = document.getElementById('template-sentence');
//   const templateSentenceCopyInput = document.getElementById('template-sentence-copy');
//   const correctedSentencesInput = document.getElementById('corrected-sentences');
//   const confirmLockBtn = document.getElementById('confirm-lock-btn');
//   const finalizeCorrectionsBtn = document.getElementById('finalize-corrections-btn');
//   const unlockBtn = document.getElementById('unlock-btn');

//   // Function to copy the content from Template Sentence to Template Sentence Copy
//   function copyTemplateToCopy() {
//       templateSentenceCopyInput.value = templateSentenceInput.value;
//       templateSentenceInput.readOnly = true;
//       templateSentenceCopyInput.readOnly = false;
//       confirmLockBtn.disabled = true;
//       unlockBtn.disabled = false;
//       finalizeCorrectionsBtn.style.display = 'block';
//   }

//   // Function to unlock the Template Sentence
//   function unlockTemplate() {
//       templateSentenceInput.readOnly = false;
//       confirmLockBtn.disabled = false;
//       unlockBtn.disabled = true;
//       finalizeCorrectionsBtn.style.display = 'none'; // Hide Finalize Corrections when unlocked
//       templateSentenceInput.value = ''; // Clear Template Sentence Copy when unlocked
//   }

//   // Function to finalize corrections
//   function finalizeCorrections(tempSent, tempSentCpy) {
//     //Finalize Corrections button goes here

//       // const redResult = redIncorrect(tempSent, tempSentCpy);
//       // const greenResult = greenCorrect(tempSent, tempSentCpy);
//       // textModify(redResult, greenResult);
//       // correctedSentencesInput.value = textModify(redResult, greenResult);
//   }

//   // Initially, disable the Unlock button and hide Finalize Corrections
//   unlockBtn.disabled = true;

//   confirmLockBtn.addEventListener('click', copyTemplateToCopy);
//   unlockBtn.addEventListener('click', unlockTemplate);
//   finalizeCorrectionsBtn.addEventListener('click', finalizeCorrections);
// });
