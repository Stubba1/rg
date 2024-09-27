import React, { useState } from 'react';
import { Button, Paper, Typography, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

function TranslationForm({ products, languages, onTranslate }) {
    const [inputText, setInputText] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('any');
    const [sourceLanguage, setSourceLanguage] = useState('en');
    const [targetLanguage, setTargetLanguage] = useState('da');

    const handleTranslate = async () => {
        if (!inputText.trim()) {
            alert('Please enter text to translate.');
            return;
        }

        if (sourceLanguage === targetLanguage) {
            alert('Source and target languages must be different.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/translate`, { // Ensure this uses HTTPS via the environment variable
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputText, selectedProduct, sourceLanguage, targetLanguage }),
            });

            if (!response.ok) {
                alert('Error during translation. Please try again.');
                return;
            }

            const translatedTable = await response.json();
            onTranslate(translatedTable);
        } catch (error) {
            alert('An error occurred while translating: ' + error.message);
        }
    };

    return (
        <Paper style={{ padding: '1rem', marginTop: '2rem' }}>
            <Typography variant="h6" gutterBottom>
                Translate Text
            </Typography>
            <TextField
                label="Input Text"
                fullWidth
                multiline
                rows={4}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                variant="outlined"
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Select Product</InputLabel>
                <Select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                >
                    <MenuItem value="any">Any Product</MenuItem>
                    <MenuItem value="new">New Product</MenuItem>
                    {products.map(product => (
                        <MenuItem key={product} value={product}>{product}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Source Language</InputLabel>
                <Select
                    value={sourceLanguage}
                    onChange={(e) => setSourceLanguage(e.target.value)}
                >
                    {languages.map(language => (
                        <MenuItem key={language} value={language}>{language.toUpperCase()}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Target Language</InputLabel>
                <Select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                >
                    {languages.map(language => (
                        <MenuItem key={language} value={language}>{language.toUpperCase()}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={handleTranslate}
                style={{ marginTop: '1rem' }}
            >
                Translate
            </Button>
        </Paper>
    );
}

export default TranslationForm;
