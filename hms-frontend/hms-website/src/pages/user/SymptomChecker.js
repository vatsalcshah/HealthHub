import React, { useState } from 'react';
import PatientSidebar from '../../components/PatientSidebar';
import { Typography} from '@mui/material';


function SymptomCheckerPage() {
  const [answers, setAnswers] = useState({
    fever: false,
    cough: false,
    dizziness: false,
    vomiting: false,
    headacheOrDiarrhea: false,
  });

  const [diagnosis, setDiagnosis] = useState(null);

  const handleChange = (symptom, value) => {
    setAnswers(prevState => ({
      ...prevState,
      [symptom]: value,
    }));
  };

  const handleSubmit = () => {
    // Comprehensive diagnosis logic
    if (answers.fever && answers.cough && answers.dizziness && !answers.vomiting && answers.headacheOrDiarrhea) {
      setDiagnosis("You may have a flu with gastrointestinal symptoms.");
    } else if (answers.fever && answers.cough && answers.dizziness && answers.vomiting && answers.headacheOrDiarrhea) {
      setDiagnosis("You may have a severe respiratory infection with vomiting.");
    } else if (!answers.fever && answers.cough && answers.dizziness && answers.vomiting && answers.headacheOrDiarrhea) {
      setDiagnosis("You may have a stomach virus with respiratory symptoms.");
    } else if (answers.fever && answers.dizziness && answers.vomiting && answers.headacheOrDiarrhea) {
      setDiagnosis("You may have food poisoning with fever.");
    } else if (answers.fever && answers.cough) {
      setDiagnosis("You may have a common cold with fever.");
    } else if (answers.fever && answers.headacheOrDiarrhea) {
      setDiagnosis("You may have a fever due to other causes.");
    } else if (answers.cough && answers.headacheOrDiarrhea) {
      setDiagnosis("You may have a respiratory infection or flu.");
    } else if (answers.dizziness && answers.headacheOrDiarrhea) {
      setDiagnosis("You may have a viral or bacterial infection.");
    } else if (answers.vomiting && answers.headacheOrDiarrhea) {
      setDiagnosis("You may have gastroenteritis or food poisoning.");
    } else if (answers.fever) {
      setDiagnosis("You may have a fever due to various causes.");
    } else if (answers.cough) {
      setDiagnosis("You may have a respiratory infection.");
    } else if (answers.dizziness) {
      setDiagnosis("You may have a viral illness or inner ear problem.");
    } else if (answers.vomiting) {
      setDiagnosis("You may have gastrointestinal issues.");
    } else if (answers.headacheOrDiarrhea) {
      setDiagnosis("You may have a viral or bacterial infection.");
    } else {
      setDiagnosis("It's difficult to determine your illness based on the symptoms provided.");
    }
  };

  return (
    <div className="container-scroller" >
      <PatientSidebar />
        <div style={{ backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/001/987/697/non_2x/abstract-hexagon-pattern-dark-blue-background-medical-and-science-concept-molecular-structures-free-vector.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' , display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', backgroundColor: '#f7f7f7' }}>
          <div style={{ maxWidth: '600px', width: '100%', padding: '40px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h1 style={{ color: '#007bff', marginBottom: '10px' }}>⚕️ Symptom Checker</h1>
              <Typography variant="subtitle1" sx={{ color: '#333' }}>Please select symptoms:</Typography>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ color: '#333' }}>
                  <input
                    type="checkbox"
                    checked={answers.fever}
                    onChange={e => handleChange('fever', e.target.checked)}
                  /> Do you have fever?
                </label>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ color: '#333' }}>
                  <input
                    type="checkbox"
                    checked={answers.cough}
                    onChange={e => handleChange('cough', e.target.checked)}
                  /> Do you have cough?
                </label>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ color: '#333' }}>
                  <input
                    type="checkbox"
                    checked={answers.dizziness}
                    onChange={e => handleChange('dizziness', e.target.checked)}
                  /> Are you feeling dizziness?
                </label>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ color: '#333' }}>
                  <input
                    type="checkbox"
                    checked={answers.vomiting}
                    onChange={e => handleChange('vomiting', e.target.checked)}
                  /> Are having vomiting sensation?
                </label>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ color: '#333' }}>
                  <input
                    type="checkbox"
                    checked={answers.headacheOrDiarrhea}
                    onChange={e => handleChange('headacheOrDiarrhea', e.target.checked)}
                  /> Are you experiencing headache or diarrhea?
                </label>
              </div>
            </div>
            <button style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', width: '100%' }} onClick={handleSubmit}>Submit</button>
                        {diagnosis && (
            <p style={{ marginTop: '20px', color: 'red', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                &#9888; {diagnosis}
            </p>
            )}          
            </div>
        </div>
        </div>

  );
}

export default SymptomCheckerPage;
