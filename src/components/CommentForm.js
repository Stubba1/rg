import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';


function CommentForm({ termId, language, onCommentAdded }) {
    const [commentText, setCommentText] = useState('');
    const [createdBy, setCreatedBy] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/terms/${termId}/comments`, {
                text: commentText,
                createdBy,
                language
            });
            onCommentAdded(response.data);
            setCommentText('');
            setCreatedBy('');
        } catch (error) {
            console.error('There was an error adding the comment!', error);
        }
    };

    return (
        <Paper style={{ padding: '1rem', marginTop: '1rem' }}>
            <Typography variant="h6" gutterBottom>
                Add Comments
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Your Name"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label={`Add Comment for ${language.toUpperCase()}`}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit Comment
                </Button>
            </form>
        </Paper>
    );
}

export default CommentForm;
