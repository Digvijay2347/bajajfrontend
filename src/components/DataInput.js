import React, { useState } from 'react';
import Select from 'react-select';
import './DataInput.css'; // Ensure CSS is correctly imported

const DataInput = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponseData(null);

    // Validate JSON
    let jsonData;
    try {
      jsonData = JSON.parse(jsonInput);
      if (!jsonData.data || !Array.isArray(jsonData.data)) {
        throw new Error('Invalid JSON format: "data" should be an array.');
      }
    } catch (err) {
      setError('Invalid JSON format.');
      return;
    }

    // Call the backend API
    try {
      const response = await fetch('https://backendapi-o3ow.onrender.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      const result = await response.json();
      console.log('Backend Response:', result); // Debugging line
      if (response.ok) {
        setResponseData(result);
      } else {
        setError(result.message || 'Error processing the request.');
      }
    } catch (err) {
      setError('Failed to connect to the backend.');
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!responseData) return null;

    let displayData = {};
    selectedOptions.forEach((option) => {
      displayData[option.value] = responseData[option.value];
    });

    return (
      <div className="response">
        <h3>Response Data:</h3>
        <pre>{JSON.stringify(displayData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="data-input-container">
      <h1>Data Processor</h1>
      <form onSubmit={handleSubmit} className="data-form">
        <textarea
          rows="4"
          cols="50"
          value={jsonInput}
          onChange={handleInputChange}
          placeholder='Enter JSON like {"data": ["A", "C", "z"]}'
          className="json-input"
        />
        <br />
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {responseData && (
        <>
          <Select
            isMulti
            name="select-options"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSelectChange}
          />
          {renderResponse()}
        </>
      )}
    </div>
  );
};

export default DataInput;
