import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


function TranslatedText({ translatedTable }) {
    if (!Array.isArray(translatedTable)) {
        return (
            <Paper style={{ padding: '1rem', marginTop: '2rem' }}>
                <Typography variant="h6" gutterBottom>
                    Translated Text
                </Typography>
                <Typography color="error">Error: Translation data is not in the expected format.</Typography>
            </Paper>
        );
    }

    // Extract just the translation part for the summarized view
    const summarizedTranslation = translatedTable.map(row => row.translation.replace(/<\/?[^>]+(>|$)/g, '')).join(', ');

    return (
        <Paper style={{ padding: '1rem', marginTop: '2rem' }}>
            <Typography variant="h6" gutterBottom>
                Translated Text (Summary)
            </Typography>
            <Typography component="div" style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>
                {summarizedTranslation}
            </Typography>

            <Typography variant="h6" gutterBottom>
                Translated Text (Detailed)
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Original Term</TableCell>
                            <TableCell>Translation</TableCell>
                            <TableCell>Products</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {translatedTable.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.sourceTerm}</TableCell>
                                <TableCell><div dangerouslySetInnerHTML={{ __html: row.translation }} /></TableCell>
                                <TableCell>{row.productNames}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default TranslatedText;
