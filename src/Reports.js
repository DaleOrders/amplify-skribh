import React, { useState } from 'react';
import TranscriptProcessor from './TranscriptProcessor';  // Importing the TranscriptProcessor component

const Reports = () => {
  // You can add any additional state or logic if needed for the reports
  return (
    <div>
      <h2>Reports</h2>
      <p>This is where reports will be generated.</p>

      {/* Render the TranscriptProcessor component here */}
      <TranscriptProcessor />
    </div>
  );
};

export default Reports;


