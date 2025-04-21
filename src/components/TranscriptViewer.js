import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

export default function TranscriptViewer() {
  const [transcript, setTranscript] = useState('Loading transcript...');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        // Initialize the S3 client
        const s3 = new AWS.S3();
        
        // Define your S3 bucket name and prefix for transcripts
        const bucketName = 'amplifyskribhupload07344-dev'; // Replace with your bucket name
        const prefix = 'transcripts/';

        // List the objects in the "transcripts" folder
        const params = {
          Bucket: bucketName,
          Prefix: prefix,
        };

        const data = await s3.listObjectsV2(params).promise();

        if (data.Contents.length === 0) {
          throw new Error('No transcripts found.');
        }

        // Get the latest transcript file
        const latestTranscript = data.Contents.sort(
          (a, b) => new Date(b.LastModified) - new Date(a.LastModified)
        )[0];

        // Retrieve the transcript file
        const transcriptParams = {
          Bucket: bucketName,
          Key: latestTranscript.Key,
        };

        const fileData = await s3.getObject(transcriptParams).promise();

        // Parse the JSON content of the file
        const transcriptText = JSON.parse(fileData.Body.toString());
        setTranscript(transcriptText.results.transcripts[0].transcript);
      } catch (err) {
        console.error('Error fetching transcript:', err);
        setError('Error loading transcript');
      }
    };

    fetchTranscript();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Transcript</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>{transcript}</p>
      )}
    </div>
  );
}


