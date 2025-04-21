import React, { useState } from 'react';
// Uncomment this when Storage is correctly working
// import { uploadData } from '@aws-amplify/storage';

const AudioUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select an audio file to upload.');
      return;
    }

    try {
      setUploading(true);

      // Uncomment and configure this when Storage is working
      /*
      const result = await uploadData({
        key: file.name,
        data: file,
        options: {
          contentType: file.type,
        },
      }).result;

      console.log('Upload success:', result);
      alert('File uploaded successfully!');
      */

      // Placeholder for now
      setTimeout(() => {
        alert(`Pretending to upload: ${file.name}`);
        setUploading(false);
        setFile(null);
      }, 1000);
    } catch (err) {
      console.error('Upload error:', err);
      alert('There was an error uploading the file.');
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Audio Upload</h2>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default AudioUpload;




