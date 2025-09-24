// src/components/owner/OwnerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const OwnerDashboard = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); // 🔑 Assumes token is stored after login

  useEffect(() => {
    const fetchMyApartments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/apartments/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApartments(res.data);
      } catch (err) {
        console.error("Failed to fetch apartments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyApartments();
  }, [token]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">My Listed Apartments</h2>
      {apartments.length === 0 ? (
        <p>No apartments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apartments.map((apt) => (
            <div key={apt._id} className="border p-4 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold">{apt.title}</h3>
              <p className="text-gray-600">{apt.location}</p>
              <p className="text-gray-800 font-medium mt-2">€{apt.price}</p>
              <p className="mt-1 text-sm italic">{apt.description}</p>
              <div className="mt-4">
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    apt.verificationStatus === "Verified"
                      ? "bg-green-100 text-green-700"
                      : apt.verificationStatus === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {apt.verificationStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
