import React from 'react';
import { Typography, Paper, Button } from '@mui/material';


function FileUploadInstructions() {
    return (
        <Paper style={{ padding: '1rem', marginBottom: '2rem' }}>
            <Typography variant="h6" gutterBottom>
                Excel File Format for Uploading Terms
            </Typography>
    

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Product Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>English</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Danish</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Finnish</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Icelandic</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Norwegian</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Swedish</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Milk</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Milk</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Mælk</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Maito</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Mjólk</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Melk</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Mjölk</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Preferred</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Bread</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Bread</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Brød</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Leipä</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Brauð</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Brød</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Bröd</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Newest</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Apple</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Apple</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Æble</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Omena</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Epli</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Eple</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Äpple</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}></td>
                    </tr>
                </tbody>
            </table>

            <Button variant="contained" color="primary" href="/sample-template.xlsx" download style={{ marginTop: '1rem' }}>
                Download Sample Template
            </Button>
        </Paper>
    );
}

export default FileUploadInstructions;
