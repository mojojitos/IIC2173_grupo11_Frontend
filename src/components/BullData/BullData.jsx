import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BullData.scss'; // Import the CSS file

function BullData() {
  const [jobId, setJobId] = useState('');
  const [jobData, setJobData] = useState(null);
  const [status, setStatus] = useState(null);

  const handleFetchJob = async () => {
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/job/${jobId}`);
      setJobData(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    }
  };

  const handleCreateJob = async () => {
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/job`);
    setStatus(response.data);
      // console.log('Job created:', response.data);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const handleFetchStatus = async () => {
    try {
      // eslint-disable-next-line no-undef
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/puerto_8000`);
      setStatus(response.data);
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  useEffect(() => {
    handleFetchStatus(); // Fetch status on mount
  }, []);

  return (
    <div className='bullInfo'>
      <div>
        <h1>Job Management</h1>
      
        <h2>Fetch Job</h2>
        <input
          type="text"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          placeholder="Enter Job ID"
        />
        <button onClick={handleFetchJob}>Fetch Job</button>
        {jobData && <pre>{JSON.stringify(jobData, null, 2)}</pre>}
      </div>
      <div>
        <h2>Create Job</h2>
        <button onClick={handleCreateJob}>Create Job</button>
      </div>
      <div>
        <h2>Status</h2>
        {status && <pre>{JSON.stringify(status, null, 2)}</pre>}
      </div>
    </div>
  );
}

export default BullData;
