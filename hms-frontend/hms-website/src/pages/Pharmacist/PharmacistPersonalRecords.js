import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import PharmacistSidebar from '../../components/PharmacistSidebar';

const PersonalRecordsPage = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchPersonalRecords();
  }, []);

  const fetchPersonalRecords = async () => {
    try {
      const response = await fetch('https://example.com/api/getTblrecords.php');
      if (!response.ok) {
        throw new Error('Failed to fetch personal records');
      }
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching personal records:', error);
    }
  };

  return (
    <>
    <PharmacistSidebar/>
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#007bff', fontWeight: 'bold', marginBottom: '20px' }}>
        <strong>Patient Health Records</strong>
      </Typography>
      <TableContainer component={Paper} style={{ backgroundColor: '#f5f5f5' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: '#007bff', fontWeight: 'bold', marginBottom: '20px' }}>User ID</TableCell>
              <TableCell style={{ color: '#007bff', fontWeight: 'bold', marginBottom: '20px' }}>BP</TableCell>
              <TableCell style={{ color: '#007bff', fontWeight: 'bold', marginBottom: '20px' }}>Diabetes</TableCell>
              <TableCell style={{ color: '#007bff', fontWeight: 'bold', marginBottom: '20px' }}>Heart Health Issues</TableCell>
              <TableCell style={{ color: '#007bff', fontWeight: 'bold', marginBottom: '20px' }}>Arthritis</TableCell>
              <TableCell style={{ color: '#007bff', fontWeight: 'bold', marginBottom: '20px' }}>Allergies</TableCell>
              <TableCell style={{ color: '#007bff', fontWeight: 'bold', marginBottom: '20px' }}>Other Issues</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map(record => (
              <TableRow key={record.UserID}>
                <TableCell>{record.UserID}</TableCell>
                <TableCell>{record.BP}</TableCell>
                <TableCell>{record.Diabetes}</TableCell>
                <TableCell>{record.HeartHealthIssues}</TableCell>
                <TableCell>{record.Arthritis}</TableCell>
                <TableCell>{record.Allergies}</TableCell>
                <TableCell>{record.OtherIssues}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
};

export default PersonalRecordsPage;
