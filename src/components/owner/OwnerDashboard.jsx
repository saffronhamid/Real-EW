import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OwnerDashboard = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyApartments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/apartments/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApartments(res.data);
      } catch (err) {
        console.error('Failed to fetch apartments', err);
        setApartments([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchMyApartments();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">My Listed Apartments</h2>

      {loading ? (
        <p>Loading apartments...</p>
      ) : apartments.length === 0 ? (
        <p>No apartments found.</p>
      ) : (
        <ul className="space-y-4">
          {apartments.map((apt) => (
            <li key={apt._id} className="p-4 border rounded-md shadow">
              <h3 className="text-lg font-semibold">{apt.title || 'Untitled Apartment'}</h3>
              <p>Status: <strong>{apt.verificationStatus}</strong></p>
              <p>Price: €{apt.rentPrice}</p>
              <p>{apt.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OwnerDashboard;
