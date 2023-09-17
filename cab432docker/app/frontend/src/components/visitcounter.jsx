import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VisitCounter = ({counter}) => {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await axios.get('http://localhost:3001/api')
        .then(response => {
            setCount(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching the data', error);
            setLoading(false);
        });
    }

    fetchData();
  }, []);

  return (
    <div>
      <p>{count}</p>
    </div>
  );
};

export default VisitCounter;
