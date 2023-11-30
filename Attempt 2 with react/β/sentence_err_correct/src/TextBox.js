import React, { useState, useRef } from "react";
import "./TextBox.css";
import textModify from "./TextModify";

const TextBox = () => {
  const [textValues, setTextValues] = useState({
    field1: "",
    field2: "",
    field4: "",
  });

  const [isLocked, setIsLocked] = useState(false);
  const [showCorrections, setShowCorrections] = useState(false);

  const correctionsOutputRef = useRef(null);

  const handleTextChange = (field, value) => {
    setTextValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleConfirmAndLock = () => {
    // Copy text from "Template Sentence Copy" to "Template Sentence" field
    setTextValues((prevValues) => ({
      ...prevValues,
      field2: prevValues.field1,
    }));

    setIsLocked(true);
    setShowCorrections(true);
  };

  const handleUnlock = () => {
    setTextValues((prevValues) => ({
      ...prevValues,
      field2: "", // Clear Template Sentence Copy field
    }));
    setIsLocked(false); // Reset isLocked state
    setShowCorrections(false); // Reset showCorrections state
  };

  const handleCopyToClipboard = () => {
    const correctionsOutput = correctionsOutputRef.current;

    if (correctionsOutput) {
      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = correctionsOutput.innerHTML;
      document.body.appendChild(tempTextArea);

      tempTextArea.select();
      document.execCommand("copy");

      document.body.removeChild(tempTextArea);
    }
  };

  const exportToObsidianMdAdmonition = () => {
    const correctionsOutput = correctionsOutputRef.current;

    if (correctionsOutput) {
      // Get the inner HTML content
      const innerHTML = correctionsOutput.innerHTML;

      const admonitionContent = `\`\`\`ad-info
icon: edit
title: Sentence correction
color: 203, 187, 175\n${innerHTML}\n
${textValues.field4}
\`\`\``;

      // Now you can use admonitionContent as needed
      console.log(admonitionContent);

      // If you want to copy it to the clipboard, you can use a similar approach as handleCopyToClipboard
      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = admonitionContent;
      document.body.appendChild(tempTextArea);

      tempTextArea.select();
      document.execCommand("copy");

      document.body.removeChild(tempTextArea);
    }
  };

  return (
    <div className="text-box-outer-container">
      <div className="text-box-container">
        <label className="textbox-label">Template Sentence:</label>
        <input
          type="text"
          value={textValues.field1}
          onChange={(e) => handleTextChange("field1", e.target.value)}
          readOnly={isLocked}
          placeholder="Enter starting sentence"
        />
        <label className="textbox-label">Template Sentence Copy:</label>
        <input
          type="text"
          value={textValues.field2}
          onChange={(e) => handleTextChange("field2", e.target.value)}
          readOnly={!isLocked}
          placeholder="Enter sentence with corrections"
        />
        <label className="textbox-label">Corrections:</label>
        <div className="corrections-container">
          <div
            className="corrections-output"
            ref={correctionsOutputRef}
            dangerouslySetInnerHTML={{
              __html: showCorrections
                ? textModify(textValues.field1, textValues.field2)
                : "&nbsp;",
            }}
          />
        </div>

        <label className="textbox-label">Comments:</label>
        <input
          type="text"
          value={textValues.field4}
          onChange={(e) => handleTextChange("field4", e.target.value)}
          placeholder="Enter notes or comments you have"
        />
        {/* Button container with Confirm and Lock, Unlock, Copy to Clipboard, and Export to Obsidian md Admonition buttons */}
        <div className="button-container">
          <button onClick={handleConfirmAndLock} disabled={isLocked}>
            Confirm and Lock
          </button>
          {isLocked && <button onClick={handleUnlock}>Unlock</button>}
          {isLocked && (
            <button
              className="copy-to-clipboard"
              onClick={handleCopyToClipboard}
            >
              Copy to Clipboard
            </button>
          )}
          {isLocked && (
            <button
              className="admonition-button"
              onClick={exportToObsidianMdAdmonition}
            >
              Export to Obsidian md Admonition
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextBox;
