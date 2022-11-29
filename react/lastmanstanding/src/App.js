import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/api/info/Netherlands');
      setData(result.data);
      console.log(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}


export default App;
