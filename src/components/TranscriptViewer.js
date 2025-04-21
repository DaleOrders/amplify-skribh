import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

export default function TranscriptViewer() {
  const [transcript, setTranscript] = useState('Loading transcript...');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        console.log('Initializing S3 client...');
        const s3 = new AWS.S3();

        const bucketName = 'amplifyskribhupload07344-dev';
        const prefix = 'transcripts/';

        console.log('Listing objects in the transcripts folder...');
        const params = {
          Bucket: bucketName,
          Prefix: prefix,
        };

        const data = await s3.listObjectsV2(params).promise();
        console.log('Objects in transcripts folder:', data);

        if (!data.Contents || data.Contents.length === 0) {
          throw new Error('No transcripts found.');
        }

        // Get the latest transcript file
        const latestTranscript = data.Contents.sort(
          (a, b) => new Date(b.LastModified) - new Date(a.LastModified)
        )[0];
        console.log('Latest transcript file:', latestTranscript);

        const transcriptParams = {
          Bucket: bucketName,
          Key: latestTranscript.Key,
        };

        console.log('Fetching transcript file:', transcriptParams);
        const fileData = await s3.getObject(transcriptParams).promise();
        console.log('Transcript file data:', fileData);

        // Parse the transcript JSON
        const transcriptJson = JSON.parse(fileData.Body.toString());
        console.log('Parsed transcript JSON:', transcriptJson);

        // Extract the transcript text
        const transcriptText = transcriptJson.results.transcripts[0].transcript;
        console.log('Extracted transcript:', transcriptText);

        setTranscript(transcriptText);
      } catch (err) {
        console.error('Error fetching transcript:', err);
        setError('Error loading transcript');
      }
    };

    fetchTranscript();
  }, []);

  return (
    <div>
      <h2>Transcript Viewer</h2>
      {error ? <p style={{ color: 'red' }}>{error}</p> : <p>{transcript}</p>}
    </div>
  );
}


