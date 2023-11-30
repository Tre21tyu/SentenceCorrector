// DiffApp.js
import React, { useState } from 'react';
import DiffForm from './DiffForm';
import textModify from '';

const DiffApp = () => {
  const [redResult, setRedResult] = useState('');
  const [greenResult, setGreenResult] = useState('');

  const handleCompare = (original, modified) => {
    setRedResult(redIncorrect(original, modified));
    setGreenResult(greenCorrect(original, modified));
  };

  return (
    <div className="container">
      <h1>Text Difference App</h1>
      <DiffForm onSubmit={handleCompare} />
      <div dangerouslySetInnerHTML={{ __html: textModify(redResult, greenResult) }} />
    </div>
  );
};

export default DiffApp;
