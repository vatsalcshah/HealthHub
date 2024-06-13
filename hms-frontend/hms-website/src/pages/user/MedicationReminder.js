import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import PatientSidebar from '../../components/PatientSidebar';
import { useNavigate } from 'react-router-dom';

function MedicationReminder() {
  const [userId, setUserId] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [newReminderName, setNewReminderName] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const UserID = sessionStorage.getItem('UserID');
    if (UserID) {
      setUserId(UserID);
      fetchReminders(UserID);
    } else {
      alert('UserID is not available.');
      sessionStorage.clear();
      navigate('/');
      setIsLoading(false);
    }
  }, [navigate]);

  const fetchReminders = async (UserID) => {
    try {
      const response = await fetch(`https://example.com/api/reminders.php?userID=${UserID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reminders');
      }
      const text = await response.text();
      const data = text ? JSON.parse(text) : [];
      setReminders(data);
    } catch (error) {
      alert('Error fetching reminders: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addReminder = async () => {
    // Check if the medicine name or time is empty
    if (!newReminderName.trim() || !newReminderTime.trim()) {
      alert('Error: Medicine name and time cannot be empty.');
      return; // Exit the function early
    }

    try {
      const response = await fetch('https://example.com/api/reminders.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: userId,
          reminderName: newReminderName,
          reminderTime: newReminderTime,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add reminder');
      }

      const data = await response.json();
      if (!data) {
        throw new Error('Empty response received');
      }

      setReminders([...reminders, data]);
      setNewReminderName('');
      setNewReminderTime('');

      fetchReminders(userId);
    } catch (error) {
      alert('Error adding reminder: ' + error.message);
    }
  };

  const deleteReminder = async (reminderID) => {
    try {
      const response = await fetch(`https://example.com/api/reminders.php?reminderID=${reminderID}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete reminder');
      }
      setReminders(prevReminders => prevReminders.filter((reminder) => reminder.reminderID !== reminderID));
    } catch (error) {
      alert('Error deleting reminder: ' + error.message); // Show error as alert
    }
  };

  if (isLoading) {
    return <Container maxWidth="md" style={{ textAlign: 'center', paddingTop: '50px' }}>
      <CircularProgress />
    </Container>;
  }

  return (
    <div className="container-scroller">
      <PatientSidebar />
      <Container maxWidth="md" style={{ color: '#007bff', marginBottom: '500px' }}>
        <Typography variant="h3" gutterBottom>⏰ Medication Reminders</Typography>
        {reminders.length === 0 && <Typography variant="body1">No reminders found.</Typography>}
        <List>
          {reminders.map((reminder) => (
            <ListItem key={reminder.reminderID}>
              <ListItemText
                primary={reminder.reminderName}
                secondary={reminder.reminderTime}
                sx={{ minWidth: '150px', paddingRight: '16px' }} // Adjust spacing
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteReminder(reminder.reminderID)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Typography variant="h4" gutterBottom>Add New Reminder</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Medicine Name"
              variant="outlined"
              fullWidth
              value={newReminderName}
              onChange={(e) => setNewReminderName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Time"
              type="time"
              variant="outlined"
              fullWidth
              value={newReminderTime}
              onChange={(e) => setNewReminderTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={addReminder}>Add Reminder</Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default MedicationReminder;
