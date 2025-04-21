import React, { useState } from 'react';
import AudioUpload from './AudioUpload';
import PatientData from './PatientData';
import Reports from './Reports';
import TranscriptViewer from './components/TranscriptViewer';

const App = () => {
  const [activeTab, setActiveTab] = useState('upload');

  const renderTab = () => {
    switch (activeTab) {
      case 'upload':
        return <AudioUpload />;
      case 'patient':
        return <PatientData />;
      case 'reports':
        return <Reports />;
      case 'transcript':
        return <TranscriptViewer />;
      default:
        return <AudioUpload />;
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#3182ce', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>Medical Transcription App</h1>
      </header>

      {/* Nav Buttons */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <button onClick={() => setActiveTab('upload')}>Audio Upload</button>
        <button onClick={() => setActiveTab('patient')}>Patient Data</button>
        <button onClick={() => setActiveTab('reports')}>Reports</button>
        <button onClick={() => setActiveTab('transcript')}>Transcript</button>
      </nav>

      {/* Active Tab Content */}
      <main style={{ padding: '20px' }}>
        {renderTab()}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#2d3748', color: 'white', padding: '20px', marginTop: '40px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px' }}>© 2025 Medical Transcription App</p>
      </footer>
    </div>
  );
};

export default App;


