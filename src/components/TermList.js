import React, { useState, useEffect } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Box, TablePagination, MenuItem, Select } from '@mui/material';

function TermList({ onTermSelect, onStatusChange }) {
    const [terms, setTerms] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    const [error, setError] = useState(null); // State for handling errors

    // Fetch terms from the backend
    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/terms`); // Use your backend URL
                if (!response.ok) {
                    throw new Error('Failed to fetch terms');
                }
                const data = await response.json();
                setTerms(data);
            } catch (err) {
                console.error('Error fetching terms:', err);
                setError(err.message); // Update error state
            }
        };
        fetchTerms();
    }, []); // Fetch terms on component mount

    const handleTermClick = (termId, language) => {
        setSelectedTerm(termId);
        setSelectedLanguage(language);
        onTermSelect(termId, language);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Preferred':
                return '#cdf7e0'; // Light Green
            case 'Outdated':
                return '#f2cfce'; // Light Red
            case 'Newest':
                return '#c6ebf7'; // Light Blue
            default:
                return 'transparent'; // No color for rows without a status
        }
    };

    return (
        <Paper style={{ padding: '1rem' }}>
            <Typography variant="h6" gutterBottom>
                Term List
            </Typography>
            {error && (
                <Typography color="error">
                    {error} {/* Display error message */}
                </Typography>
            )}
            <TableContainer component={Paper} style={{ maxHeight: 400 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>English</TableCell>
                            <TableCell>Danish</TableCell>
                            <TableCell>Finnish</TableCell>
                            <TableCell>Icelandic</TableCell>
                            <TableCell>Norwegian</TableCell>
                            <TableCell>Swedish</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {terms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((term) => {
                            const getSortedComments = (language) =>
                                term.comments
                                    .filter(comment => comment.language === language)
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                            const renderComments = (language) => ({
                                __html: getSortedComments(language)
                                    .map(comment => `${comment.createdBy}: ${comment.text} (${new Date(comment.createdAt).toLocaleString()})`)
                                    .join('<br /><br />')
                            });

                            return (
                                <TableRow key={term._id} style={{ backgroundColor: getStatusColor(term.status) }}>
                                    <TableCell>{term.productName}</TableCell>

                                    {/* English */}
                                    <Tooltip
                                        title={<span dangerouslySetInnerHTML={renderComments('en')} />}
                                        arrow
                                        placement="top"
                                        disableInteractive
                                    >
                                        <TableCell
                                            onClick={() => handleTermClick(term._id, 'en')}
                                            style={{
                                                cursor: 'pointer',
                                                border: selectedTerm === term._id && selectedLanguage === 'en' ? '2px solid #007BFF' : 'none'
                                            }}
                                        >
                                            <Box>
                                                <Typography>{term.translations?.en || 'N/A'}</Typography>
                                                {getSortedComments('en').length > 0 && (
                                                    <Typography variant="caption" color="secondary">
                                                        Comments
                                                    </Typography>
                                                )}
                                            </Box>
                                        </TableCell>
                                    </Tooltip>

                                    {/* Repeat for other languages (da, fi, is, no, sv) */}

                                    {/* Danish */}
                                    <Tooltip
                                        title={<span dangerouslySetInnerHTML={renderComments('da')} />}
                                        arrow
                                        placement="top"
                                        disableInteractive
                                    >
                                        <TableCell
                                            onClick={() => handleTermClick(term._id, 'da')}
                                            style={{
                                                cursor: 'pointer',
                                                border: selectedTerm === term._id && selectedLanguage === 'da' ? '2px solid #007BFF' : 'none'
                                            }}
                                        >
                                            <Box>
                                                <Typography>{term.translations?.da || 'N/A'}</Typography>
                                                {getSortedComments('da').length > 0 && (
                                                    <Typography variant="caption" color="secondary">
                                                        Comments
                                                    </Typography>
                                                )}
                                            </Box>
                                        </TableCell>
                                    </Tooltip>

                                    {/* Continue for other languages: fi, is, no, sv... */}

                                    {/* Status Dropdown */}
                                    <TableCell>
                                        <Select
                                            value={term.status || ''}
                                            onChange={(e) => onStatusChange(term._id, e.target.value)}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Select Status' }}
                                        >
                                            <MenuItem value="">No Status</MenuItem>
                                            <MenuItem value="Preferred">Preferred</MenuItem>
                                            <MenuItem value="Outdated">Outdated</MenuItem>
                                            <MenuItem value="Newest">Newest</MenuItem>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={terms.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[rowsPerPage]}
            />
        </Paper>
    );
}

export default TermList;
