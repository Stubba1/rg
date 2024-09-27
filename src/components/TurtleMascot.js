import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import turtleImage from '../components/yes1.png'; // Image for success
import oopsImage from '../components/oops1.png'; // Image for failure

function TurtleMascot({ message, type }) {
    const mascotImage = type === 'success' ? turtleImage : oopsImage;

    return (
        <Box style={{ position: 'fixed', bottom: '80px', left: '20px', zIndex: 1000, display: 'flex', alignItems: 'center' }}>
            <Paper
                style={{
                    padding: '10px',
                    marginRight: '10px',
                    borderRadius: '10px',
                    border: '2px solid lightgreen', // Light green border for the speech bubble
                }}
            >
                <Typography variant="body1">{message}</Typography>
            </Paper>
            <img src={mascotImage} alt="Mascot" style={{ width: '90px', height: 'auto' }} />
        </Box>
    );
}

export default TurtleMascot;

