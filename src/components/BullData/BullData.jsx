import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BullData.scss'; // Import the CSS file

function BullData() {
  const [jobId, setJobId] = useState('');
  const [jobData, setJobData] = useState(null);
  const [status, setStatus] = useState(null);
  const [newJob, setNewJob] = useState('newData');

  const handleFetchJob = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/job/${jobId}`);
      setJobData(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    }
  };

  const handleCreateJob = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/job`,{ data1: newJob }
      );
      // console.log('Job created:', response.data);
      setNewJob(response.data);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const handleFetchStatus = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/heartbeat`);
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
        <input
          type="text"
          value={newJob}
          onChange={(e) => setNewJob(e.target.value)}
          placeholder="Enter Job ID"
        />
        <button onClick={handleCreateJob}>Create Job</button>
        {newJob && <pre>{JSON.stringify(newJob, null, 2)}</pre>}
      </div>
      <div>
        <h2>Status</h2>
        {status && <pre>{JSON.stringify(status, null, 2)}</pre>}
      </div>
    </div>
  );
}

export default BullData;