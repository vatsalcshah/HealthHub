import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Select, MenuItem, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import PatientSidebar from '../../components/PatientSidebar'; 

const Content = styled('div')({
  marginLeft: '10px',
  padding: '20px',
});

const AppointmentsPage = () => {
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [description, setDescription] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('');
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  useEffect(() => {
    const UserID = sessionStorage.getItem('UserID');
    if (UserID) {
      setUserId(UserID);
      fetchAppointments(UserID);
    } else {
      alert('UserID is not available.');
      sessionStorage.clear();
    }
  }, []);

  const fetchAppointments = async (userID) => {
    try {
      const response = await fetch(`https://example.com/api/scheduleAppointment.php?PatientID=${userID}`, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://example.com/api/scheduleAppointment.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'add',
          patientId: userId,
          doctorName: doctors.find(doc => doc.id === parseInt(doctorId)).firstName,
          appointmentDate: date,
          timeSlot: timeSlot,
          description: description,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to book the appointment');
      }
      alert('Appointment booked successfully');
      clearForm();
      fetchAppointments(userId);
    } catch (error) {
      console.error('Error handling appointment:', error);
      alert('Error handling appointment');
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
      const response = await fetch('https://example.com/api/scheduleAppointment.php', {
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
      fetchAppointments(userId);
      setEditingAppointmentId(null);
      setStatus('');
    } catch (error) {
      console.error('Error updating appointment status:', error);
      alert('Error updating appointment status');
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      const response = await fetch('https://example.com/api/scheduleAppointment.php', {
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
      fetchAppointments(userId);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Error cancelling appointment');
    }
  };

  const clearForm = () => {
    setDate('');
    setTimeSlot('');
    setDoctorId('');
    setDescription('');
  };

  const [availableTimeSlots] = useState(getAvailableTimeSlots());
  const [doctors] = useState([
    { id: 1, firstName: 'Dr. Rachel Patel' },
    { id: 2, firstName: 'Dr. Javier Hernandez' },
    { id: 3, firstName: 'Dr. Fatima Khan' },
    { id: 4, firstName: 'Dr. Andrej Petrov' },
    { id: 5, firstName: 'Dr. Mei Chen' },
  ]);

  function getAvailableTimeSlots() {
    return ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
  }

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
      <PatientSidebar />
      <Content>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom style={{ color: '#007bff', marginBottom: '20px', fontWeight: 'bold' }}>➡️ Appointments</Typography>
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
          <Typography variant="h4" gutterBottom style={{ color: '#007bff', marginBottom: '20px', fontWeight: 'bold' }}>🗓️ Book Appointment</Typography>
          <Card variant="outlined" style={{ marginBottom: '20px' }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <Typography variant="subtitle1" style={{ marginBottom: '3px', fontWeight: 'bold' }}> 🩺 Select Doctor: </Typography>
                  <Select
                    labelId="doctor-select-label"
                    id="doctor-select"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    required
                    fullWidth
                  >
                    {doctors.map((doctor) => (
                      <MenuItem key={doctor.id} value={doctor.id}>{doctor.firstName}</MenuItem>
                    ))}
                  </Select>
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <Typography variant="subtitle1" style={{ marginBottom: '3px', fontWeight: 'bold' }}> 🕗 Select Time Slot: </Typography>
                  <Select
                    labelId="time-slot-select-label"
                    id="time-slot-select"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    required
                    fullWidth
                  >
                    {availableTimeSlots.map((slot) => (
                      <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                    ))}
                  </Select>
                </div>
                <div style={{ marginBottom: '40px' }}>
                  <TextField
                    label="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div style={{ marginBottom: '40px' }}>
                  <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" variant="contained" color="primary">Book Appointment</Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Content>
    </>
  );
};

export default AppointmentsPage;
