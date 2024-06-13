import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Select, MenuItem, Button, TextField } from '@mui/material';
import { pink, lightBlue, lime, orange } from '@mui/material/colors';
import bpImage from '../../images/bp.png';
import diabetesImage from '../../images/sugar.png';
import heartHealthIssuesImage from '../../images/heart.png';
import arthritisImage from '../../images/bone.png';
import PatientSidebar from '../../components/PatientSidebar';

function HealthRecordPage() {
  const [userId, setUserId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [healthRecord, setHealthRecord] = useState({
    BP: '', 
    Diabetes: '',
    HeartHealthIssues: '',
    Arthritis: '',
    Allergies: '',
    OtherIssues: ''
  });

  useEffect(() => {
    const UserID = sessionStorage.getItem('UserID');
    if (UserID) {
      setUserId(UserID);
      fetchHealthRecord(UserID);
    } else {
      console.error('UserID is not available. Entering edit mode.');
      setIsEditMode(true);
    }
  }, []);

  async function fetchHealthRecord(UserID) {
    try {
      const response = await fetch(`https://example.com/api/fetchHealthRecord.php?UserID=${UserID}`);
      if (!response.ok) {
        throw new Error('Health record not found, starting in edit mode.');
      }
      const data = await response.json();
      if (Object.keys(data).length === 0) {
        setIsEditMode(true);
      } else {
        setHealthRecord(data);
        setIsEditMode(false);
      }
    } catch (error) {
      console.error('Error fetching health record:', error);
      setIsEditMode(true);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setHealthRecord(prevState => ({
        ...prevState,
        [name]: value 
    }));
  }

  async function handleSave() {
    if (!userId) {
      alert("User ID is not available. Cannot save health records.");
      return;
    }

    try {
      const response = await fetch(`https://example.com/api/saveHealthRecord.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, ...healthRecord }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to save health record.');
      }

      alert('Health record updated successfully!');
      setIsEditMode(false);
    } catch (error) {
      console.error('Error saving health record:', error);
      alert(error.message || 'Failed to save health record.');
    }
  }

  return (
    <div className="container-scroller">
      <PatientSidebar />
      <div className="content-wrapper">
        <div className="page-header">
          <Typography variant="h4" gutterBottom style={{ color: '#007bff', marginBottom: '20px', fontWeight: 'bold' }}>🧬 Personal Health Records</Typography>
        </div>
        <Grid container spacing={3}>
          {[
            { condition: 'BP', title: 'High Blood Pressure', color: pink[300], image: bpImage },
            { condition: 'Diabetes', title: 'Diabetes', color: lightBlue[400], image: diabetesImage },
            { condition: 'HeartHealthIssues', title: 'Heart Health Issues', color: lime[400], image: heartHealthIssuesImage },
            { condition: 'Arthritis', title: 'Arthritis', color: orange[300], image: arthritisImage },
          ].map(({ condition, title, color, image }) => (
            <Grid item xs={12} sm={6} key={condition}>
              <Box textAlign="center" p={2} borderRadius={2} border="1px solid grey" bgcolor={color}>
                <img src={image} alt={title} style={{ width: 50, height: 50 }} />
                <Typography variant="h6">{title}</Typography>
                {isEditMode ? (
                  <Select
                    name={condition}
                    value={healthRecord[condition]}
                    onChange={handleChange}
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value=""><em>Not Selected</em></MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                ) : (
                    <Typography variant="body1" fontWeight="bold">
                      {healthRecord[condition] || 'No Information ❌'}
                    </Typography>
                )}
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Allergies"
              variant="outlined"
              name="Allergies"
              value={healthRecord.Allergies}
              onChange={handleChange}
              disabled={!isEditMode}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Other Issues"
              variant="outlined"
              name="OtherIssues"
              value={healthRecord.OtherIssues}
              onChange={handleChange}
              disabled={!isEditMode}
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <Box textAlign="center" sx={{ mt: 2 }}>
          {isEditMode ? (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button variant="outlined" color="primary" onClick={() => setIsEditMode(true)}>
              Edit
            </Button>
          )}
        </Box>
      </div>
    </div>
  );
}

export default HealthRecordPage;
