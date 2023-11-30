document.addEventListener('DOMContentLoaded', function () {
    const templateSentenceInput = document.getElementById('template-sentence');
    const templateSentenceCopyInput = document.getElementById('template-sentence-copy');
    const confirmLockBtn = document.getElementById('confirm-lock-btn');
    const unlockBtn = document.getElementById('unlock-btn');
  
    // Function to copy the content from Template Sentence to Template Sentence Copy
    function copyTemplateToCopy() {
        templateSentenceCopyInput.value = templateSentenceInput.value;
        templateSentenceInput.readOnly = true;
        templateSentenceCopyInput.readOnly = false;
        confirmLockBtn.disabled = true;
        unlockBtn.disabled = false;
    }
  
    // Function to unlock the Template Sentence
    function unlockTemplate() {
        templateSentenceInput.readOnly = false;
        confirmLockBtn.disabled = false;
        unlockBtn.disabled = true;
        templateSentenceInput.value = ''; // Clear Template Sentence Copy when unlocked
    }
  
    // Initially, disable the Unlock button
    unlockBtn.disabled = true;
  
    confirmLockBtn.addEventListener('click', copyTemplateToCopy);
    unlockBtn.addEventListener('click', unlockTemplate);
  });