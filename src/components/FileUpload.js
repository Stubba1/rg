import React, { useState } from 'react';
import { Button, Typography, Paper } from '@mui/material';
import axios from 'axios';
import TurtleMascot from './TurtleMascot';


function FileUpload({ onTermsAdded }) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // New state to manage message type

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onTermsAdded(response.data);
            setMessage('File uploaded successfully!');
            setMessageType('success');
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Oops! Upload failed. Please check the file format and the column names and try again.');
            setMessageType('error');
        }

        // Clear the message after 5 seconds
        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 5000);
    };

    return (
        <>
            <Paper style={{ padding: '1rem', marginTop: '2rem' }}>
                <Typography variant="h6" gutterBottom>
                    Upload Excel File
                </Typography>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                <Button variant="contained" color="primary" onClick={handleUpload} style={{ marginTop: '1rem' }}>
                    Upload and Add Terms
                </Button>
            </Paper>
            {message && <TurtleMascot message={message} type={messageType} />}
        </>
    );
}

export default FileUpload;
