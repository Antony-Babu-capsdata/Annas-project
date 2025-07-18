import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash.debounce';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const SuggestionDropdown = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [descriptions, setDescriptions] = useState([]);

  const loadSuggestions = async (input) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:1337/gptai', { prompt: input });

      const db = Array.isArray(res.data.databaseResults) ? res.data.databaseResults : [];
      const gpt = Array.isArray(res.data.gptSuggestions) ? res.data.gptSuggestions : [];

      // Build a map from db names to their full items (case-insensitive)
      const dbMap = Object.fromEntries(
        db.map(item => [item.name.toLowerCase(), item])
      );
      // Format options: prefer DB's name casing & description when available
      const formattedOptions = (gpt.length > 0 ? gpt : db).map(item => {
        const name = item.name;
        const dbItem = dbMap[name.toLowerCase()];

        const finalName = dbItem ? dbItem.name : name; // keep DB's casing
        const description = dbItem ? dbItem.description : item.description || '';
        const id = dbItem ? dbItem.id : null;

        return {
          label: finalName,
          value: { id, name: finalName, description },
          description,
        };
      });

      console.log('Formatted Options:', formattedOptions);
      setOptions(formattedOptions);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      toast.error('Failed to load suggestions.');
    } finally {
      setLoading(false);
    }
  };

  const debouncedLoad = useCallback(debounce(loadSuggestions, 500), []);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected || []);
    setDescriptions((selected || []).map(item => item.description));
  };

  const handleSubmit = async () => {
    if (selectedOptions.length === 0) {
      toast.warning('Please select at least one item.');
      return;
    }
    console.log('selectedopt', selectedOptions);

    try {
        // From GPT: insert into existing DB first to get new id
        const res = await axios.post('http://localhost:1337/createmyfruits', selectedOptions);
        // finalId = res.data.id; // backend should return the new id
        // console.log('Created in existing DB, got new id:', finalId);

      toast.success('All Suggestion saved successfully!');
      setSelectedOptions([]);
      setDescriptions([]);
    } catch (error) {
      console.error('Error saving Suggestion:', error.response?.data || error.message);
      toast.error('Failed to save one or more Suggestion.');
    }
  };


  return (

    <div className="min-vh-100 bg-navy text-white">
      <ToastContainer position="top-center" autoClose={2500} />

      {/* Header - full width */}
      <nav className="navbar navbar-expand-lg navbar-dark shadow mb-6 p-3 mb-5 w-100" style={{ backgroundColor: "#112627" }}>
        <div className="container-fluid">
          <span className="navbar-brand h1 text-white">Suggestion Search App</span>
        </div>
      </nav>

      {/* Heading and Description */}
      <div className="text-center mb-4 px-3">
        <h2 className="fw-bold">Get Your Suggestions</h2>
        <p className="lead" style={{ color: "#e0e0e0" }}>Type something to get your suggestions</p>
      </div>

      {/* Card Container */}
      <div className="container py-4 pt-4">
        <div className="card shadow p-4 mt- text-white" style={{ backgroundColor: "#112627" }}>
          <h4 className="mb-3">Search & Select</h4>

          {/* Loader */}
          {loading && (
            <div className="mb-3 text-center">
              <ClipLoader color="#1aaaac" size={35} />
            </div>
          )}

          {/* React Select */}
          <div className="mb-3">
            <Select
              inputId="search"
              options={options}
              onChange={handleSelectChange}
              onInputChange={(val) => {
                if (val.length >= 2) debouncedLoad(val);
              }}
              value={selectedOptions}
              placeholder="Type at least 2 letters..."
              isClearable
              isSearchable
              isLoading={loading}
              isMulti
              styles={{
                control: (base) => ({ ...base, backgroundColor: '#f2f3f4 ' }),
                input: (base) => ({ ...base, color: '#000' }),
                singleValue: (base) => ({ ...base, color: '#000' }),
                menu: (base) => ({ ...base, color: '#000' }),
              }}
            />
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button onClick={handleSubmit} className="btn btn-secondary btn-lg">
              Save to Database
            </button>
          </div>


          {/* Descriptions */}
          {descriptions.length > 0 && (
            <div className="alert mt-4" style={{ backgroundColor: 'beige', color: 'black' }}>
              <strong>Descriptions:</strong>
              <ul className="mb-0">
                {descriptions.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="text-center mb-4 px-3">
        <p className="lead" style={{ color: "#e0e0e0" }}>Thankyou for visiting!!😊😊</p>
      </div>
    </div>

  );
};
export default SuggestionDropdown;
