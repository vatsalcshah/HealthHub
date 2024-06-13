import React, { useState, useEffect } from 'react';
import { Container, Typography, Select, MenuItem, Card, CardContent, Button } from '@mui/material';
import { styled } from '@mui/system';
import HealthcareProviderSidebar from '../../components/HealthcareProviderSidebar'; 

const Content = styled('div')({
  marginLeft: '10px',
  padding: '20px',
});

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState('');
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://example.com/api/allAppointments.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      alert('Error fetching appointments');
    }
  };

  const handleEdit = async (appointmentId) => {
    setEditingAppointmentId(appointmentId);
  };

  const handleCancelEdit = () => {
    setEditingAppointmentId(null);
    setStatus('');
  };

  const handleSaveEdit = async (appointmentId) => {
    try {
      const response = await fetch('https://example.com/api/allAppointments.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'updateStatus',
          appointmentId: appointmentId,
          newStatus: status,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update appointment status');
      }
      alert('Appointment status updated successfully');
      fetchAppointments();
      setEditingAppointmentId(null);
      setStatus('');
    } catch (error) {
      console.error('Error updating appointment status:', error);
      alert('Error updating appointment status');
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      const response = await fetch('https://example.com/api/allAppointments.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'delete',
          appointmentId: appointmentId,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }
      alert('Appointment cancelled successfully');
      fetchAppointments();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Error cancelling appointment');
    }
  };

  const getCardStyle = (status) => {
    switch (status) {
      case 'Scheduled':
        return { backgroundColor: 'darkOrange' };
      case 'Cancelled':
        return { backgroundColor: 'red' };
      case 'Completed':
        return { backgroundColor: 'green' };
      default:
        return {};
    }
  };

  return (
    <>
      <HealthcareProviderSidebar />
      <Content>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom style={{ color: '#007bff', marginBottom: '20px', fontWeight: 'bold' }}>➡️ Manage Appointments</Typography>
          {appointments.length === 0 ? (
            <Typography style={{ fontSize:'25px', marginLeft: '20px', marginBottom: '50px' }}>No Appointments</Typography>
          ) : (
            appointments.map(appointment => (
              <Card key={appointment.AppointmentID} variant="outlined" style={{ marginBottom: '20px', ...getCardStyle(appointment.Status) }}>
                <CardContent>
                  {editingAppointmentId === appointment.AppointmentID ? (
                    <div style={{ marginBottom: '20px' }}>
                      <Typography variant="subtitle1" style={{ marginBottom: '3px', fontWeight: 'bold' }}>Update Status:</Typography>
                      <Select
                        labelId="status-select-label"
                        id="status-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                        fullWidth
                      >
                        <MenuItem value="Scheduled">Scheduled</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                    </div>
                  ) : (
                    <>
                      <Typography style={{ color:'white', fontWeight: 'bold'}}>🗓️ Date: {appointment.AppointmentDate}, ⌚ Time: {appointment.TimeSlot}</Typography>
                      <Typography>Doctor: {appointment.DoctorName}</Typography>
                      <Typography>Description: {appointment.Description}</Typography>
                      <Typography>Status: {appointment.Status}</Typography>
                      <Button onClick={() => handleEdit(appointment.AppointmentID)}
                      style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '5px',margin:'5px', padding: '8px 16px', border: 'none' }}>Edit Status</Button>
                      <Button
                            onClick={() => handleDelete(appointment.AppointmentID)}
                            style={{ backgroundColor: '#007bff', color: 'white', margin:'5px', borderRadius: '5px', padding: '8px 16px', border: 'none' }}
                          >
                            Cancel Appointment
                      </Button>
                    </>
                  )}
                  {editingAppointmentId === appointment.AppointmentID && (
                    <>
                      <Button onClick={() => handleCancelEdit()}
                      style={{ backgroundColor: '#007bff', color: 'white', margin:'5px', borderRadius: '5px', padding: '8px 16px', border: 'none' }}>Cancel</Button>
                      <Button onClick={() => handleSaveEdit(appointment.AppointmentID)}
                      style={{ backgroundColor: '#007bff', color: 'white', margin:'5px', borderRadius: '5px', padding: '8px 16px', border: 'none' }}>Save</Button>
                    </>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </Container>
      </Content>
    </>
  );
};

export default ManageAppointments;
