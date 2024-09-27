import React, { useState } from 'react';
import { TextField, Button, Paper, Grid } from '@mui/material';
import axios from 'axios';

function AddTermForm({ onTermAdded }) {
    const [productName, setProductName] = useState('');
    const [translations, setTranslations] = useState({
        en: '',
        da: '',
        fi: '',
        is: '',
        no: '',
        sv: ''
    });

    const handleTranslationChange = (language, value) => {
        setTranslations({
            ...translations,
            [language]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/terms`, { // Ensure this uses HTTPS via the environment variable
                productName,
                translations
            });
            onTermAdded(response.data);
            setProductName('');
            setTranslations({
                en: '',
                da: '',
                fi: '',
                is: '',
                no: '',
                sv: ''
            });
        } catch (error) {
            console.error('There was an error adding the term!', error);
            // Optionally, you can handle error feedback here (e.g., setting an error message in state)
        }
    };

    return (
        <Paper style={{ padding: '2rem', marginBottom: '2rem' }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="English"
                            value={translations.en}
                            onChange={(e) => handleTranslationChange('en', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Danish"
                            value={translations.da}
                            onChange={(e) => handleTranslationChange('da', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Finnish"
                            value={translations.fi}
                            onChange={(e) => handleTranslationChange('fi', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Icelandic"
                            value={translations.is}
                            onChange={(e) => handleTranslationChange('is', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Norwegian"
                            value={translations.no}
                            onChange={(e) => handleTranslationChange('no', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Swedish"
                            value={translations.sv}
                            onChange={(e) => handleTranslationChange('sv', e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                    Add Term
                </Button>
            </form>
        </Paper>
    );
}

export default AddTermForm;
