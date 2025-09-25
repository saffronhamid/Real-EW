// src/components/owner/OwnerProfileForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OwnerProfileForm = () => {
  const [form, setForm] = useState({
    phone: '',
    address: '',
    photoUrl: '',
    nationalIdUrl: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('ownerToken');

      const response = await axios.post('/api/owners/profile', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('✅ Profile saved successfully');
      console.log(response.data);
    } catch (err) {
      alert('❌ Failed to save profile: ' + err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Owner Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="photoUrl"
          placeholder="Photo URL"
          value={form.photoUrl}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="nationalIdUrl"
          placeholder="National ID URL"
          value={form.nationalIdUrl}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Saving...' : 'Submit Profile'}
        </button>
      </form>
    </div>
  );
};

export default OwnerProfileForm;
