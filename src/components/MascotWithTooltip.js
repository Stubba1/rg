import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';

function MascotWithTooltip({ instruction, mascotImage }) {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <Box style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <img
                src={mascotImage}
                alt="Mascot"
                style={{ width: '100px', height: 'auto', cursor: 'pointer' }} // Doubled the size from 50px to 100px
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            {hovered && (
                <Paper
                    style={{
                        position: 'absolute',
                        left: '110px', // Adjusted position to accommodate the larger image
                        top: '-10px',
                        padding: '10px',
                        borderRadius: '10px',
                        border: '2px solid lightgreen', // Light green border for the speech bubble
                        width: '340px', // Even wider speech bubble
                    }}
                >
                    <Typography variant="body2">{instruction}</Typography>
                </Paper>
            )}
        </Box>
    );
}

export default MascotWithTooltip;
