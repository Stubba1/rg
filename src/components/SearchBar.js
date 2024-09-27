import React from 'react';
import { TextField, Button } from '@mui/material';


function SearchBar({ searchTerm, onSearchTermChange, onSearchClick }) {
    return (
        <div style={{ marginBottom: '1rem' }}>
            <TextField
                label="Search Term"
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
                fullWidth
            />
            <Button variant="contained" color="primary" onClick={onSearchClick} style={{ marginTop: '1rem' }}>
                Search
            </Button>
        </div>
    );
}

export default SearchBar;
