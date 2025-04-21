import React, { useState } from 'react';
import AWS from 'aws-sdk';

const AudioUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Configure AWS SDK
  AWS.config.update({
    region: 'us-west-2', // Replace with your S3 bucket region
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-west-2:9badc0ef-aaa1-4eed-ab0e-99a7a11c4a16', // Replace with your Cognito Identity Pool ID
    }),
  });

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

      // Initialize the S3 client
      const s3 = new AWS.S3();

      // Upload the file to S3
      const params = {
        Bucket: 'amplifyskribhupload07344-dev', // Replace with your S3 bucket name
        Key: file.name, // The file name
        Body: file, // The file content
        ContentType: file.type, // The file MIME type
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.error('Upload error:', err);
          alert('There was an error uploading the file.');
        } else {
          console.log('Upload success:', data);
          alert('File uploaded successfully!');
        }
        setUploading(false);
        setFile(null);
      });
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



