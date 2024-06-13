import React, { useState, useEffect } from 'react';
import HealthAdministratorSidebar from '../../components/HealthAdministratorSidebar';


const FacilitiesPage = () => {
  const [facilities, setFacilities] = useState({});
  const [loading, setLoading] = useState(true);
  const [editableFacilities, setEditableFacilities] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await fetch('https://example.com/api/facilities.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await res.json();
        setFacilities(data);
        setEditableFacilities(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching facilities:', error);
      }
    };

    fetchFacilities();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableFacilities(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch('https://example.com/api/facilities.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(editableFacilities)
      });

      if (!res.ok) {
        throw new Error('Network response was not ok.');
      }

      setFacilities(editableFacilities);
      setIsEditing(false);
      setAlert('Facilities updated successfully!');
    } catch (error) {
      console.error('Error updating facilities:', error);
    }
  };

  return (
    <>
    <HealthAdministratorSidebar/>
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ color: '#007bff', fontWeight: 'bold', marginBottom: '20px' }}>Facilities</h1>
      {loading ? (
        <p>Loading facilities data...</p>
      ) : (
        <>
          <div>
            <label htmlFor="ICU_Beds">ICU Beds: </label>
            {isEditing ? (
              <input
                type="text"
                name="ICU_Beds"
                value={editableFacilities.ICU_Beds}
                onChange={handleChange}
              />
            ) : (
              <span>{facilities.ICU_Beds}</span>
            )}
          </div>
          <div>
            <label htmlFor="Normal_Rooms">Normal Rooms: </label>
            {isEditing ? (
              <input
                type="text"
                name="Normal_Rooms"
                value={editableFacilities.Normal_Rooms}
                onChange={handleChange}
              />
            ) : (
              <span>{facilities.Normal_Rooms}</span>
            )}
          </div>
          <div>
            <label htmlFor="Ambulances">Ambulances: </label>
            {isEditing ? (
              <input
                type="text"
                name="Ambulances"
                value={editableFacilities.Ambulances}
                onChange={handleChange}
              />
            ) : (
              <span>{facilities.Ambulances}</span>
            )}
          </div>
          <div>
            <label htmlFor="XRay_Rooms">X-Ray Rooms: </label>
            {isEditing ? (
              <input
                type="text"
                name="XRay_Rooms"
                value={editableFacilities.XRay_Rooms}
                onChange={handleChange}
              />
            ) : (
              <span>{facilities.XRay_Rooms}</span>
            )}
          </div>
          {isEditing ? (
            <button onClick={handleSave} style={{ backgroundColor: '#007bff', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>Save</button>
          ) : (
            <button onClick={handleEdit} style={{ backgroundColor: '#007bff', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>Edit</button>
          )}
          {alert && <div style={{ marginTop: '10px', color: 'green' }}>{alert}</div>}
        </>
      )}
    </div>
    </>
  );
};

export default FacilitiesPage;
