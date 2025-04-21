// Import React and Axios (if using Axios)
import React, { useState } from 'react';
import axios from 'axios';

const TranscriptProcessor = () => {
  // State to hold the result from the Lambda function
  const [processedData, setProcessedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API Gateway URL
  const apiUrl = 'https://a0cyakdqr4.execute-api.us-west-2.amazonaws.com/dev/process-transcript'; // Replace with your actual API Gateway URL

  // Function to fetch data from the Lambda function via API Gateway
  const fetchProcessedData = async () => {
    setLoading(true);  // Set loading state to true when the request is made
    setError(null);    // Reset previous errors

    try {
      // Make a POST request to the API Gateway
      const response = await axios.post(apiUrl, {});  // You can add additional data if necessary
      
      // Once the request is successful, update the state with the response data
      setProcessedData(response.data);
    } catch (err) {
      // If there was an error, set the error state
      setError('Error fetching data: ' + err.message);
    } finally {
      // Set loading to false after the request finishes
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Processed Medical Data</h1>

      {/* Button to trigger the data fetch */}
      <button onClick={fetchProcessedData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Processed Data'}
      </button>

      {/* Display the processed data or error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {processedData && (
        <pre>{JSON.stringify(processedData, null, 2)}</pre>
      )}
    </div>
  );
};

export default TranscriptProcessor;
