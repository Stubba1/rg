import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import TermList from '../components/TermList';
import CommentForm from '../components/CommentForm';
import AddTermForm from '../components/AddTermForm';
import TranslationForm from '../components/TranslationForm';
import TranslatedText from '../components/TranslatedText';
import FileUpload from '../components/FileUpload';
import FileUploadInstructions from '../components/FileUploadInstructions';
import MascotWithTooltip from '../components/MascotWithTooltip';
import TurtleMascot from '../components/TurtleMascot';
import { Typography, Box } from '@mui/material';

// Import mascot images
import magnify from '../components/magnify.png';
import dict from '../components/dict.png';
import translates from '../components/translates.png';
import rocket from '../components/rocket.png';
import notes from '../components/notes.png';
import welcomes from '../components/welcomes.png';

function Home() {
    const [terms, setTerms] = useState([]);
    const [products, setProducts] = useState([]);
    const [translatedTable, setTranslatedTable] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTermId, setSelectedTermId] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [commentSuccessMessage, setCommentSuccessMessage] = useState('');
    const commentFormRef = useRef(null);

    useEffect(() => {
        fetchTerms();
    }, []);

    const fetchTerms = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/terms`); // Use the environment variable for the backend URL
            setTerms(response.data);
            const uniqueProducts = [...new Set(response.data.map(term => term.productName))];
            setProducts(uniqueProducts);
        } catch (error) {
            console.error('There was an error fetching the terms!', error);
        }
    };

    const handleSearchClick = () => {
        const filteredTerms = terms.filter(term => {
            if (!term || !term.translations) return false;

            const productNameMatch = term.productName && term.productName.toLowerCase().includes(searchTerm.toLowerCase());
            const translationsMatch = Object.values(term.translations).some(t => t && t.toLowerCase().includes(searchTerm.toLowerCase()));

            return productNameMatch || translationsMatch;
        });
        setTerms(filteredTerms);
    };

    const handleTermSelect = (termId, language) => {
        setSelectedTermId(termId);
        setSelectedLanguage(language);

        if (commentFormRef.current) {
            commentFormRef.current.scrollIntoView({ behavior: 'smooth' });

            window.setTimeout(() => {
                window.scrollBy({
                    top: -100,
                    behavior: 'smooth'
                });
            }, 500);
        }
    };

    const handleTermAdded = (newTerm) => {
        setTerms(prevTerms => [...prevTerms, newTerm]);
        setSuccessMessage('Term added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        if (!products.includes(newTerm.productName)) {
            setProducts(prevProducts => [...prevProducts, newTerm.productName]);
        }
    };

    const handleCommentAdded = (updatedTerm) => {
        setTerms(prevTerms => prevTerms.map(term => (term._id === updatedTerm._id ? updatedTerm : term)));
        setCommentSuccessMessage('Comment added successfully!');
        setTimeout(() => setCommentSuccessMessage(''), 3000);
    };

    const handleStatusChange = (termId, newStatus) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/terms/${termId}`, { status: newStatus }) // Use the environment variable for the backend URL
            .then(response => {
                setTerms(prevTerms => prevTerms.map(term => (term._id === termId ? { ...term, status: newStatus } : term)));
            })
            .catch(error => console.error('There was an error updating the term status!', error));
    };

    const handleTranslation = (translatedTable) => {
        setTranslatedTable(translatedTable);
    };

    const handleTermsAdded = (newTerms) => {
        setTerms(prevTerms => [...prevTerms, ...newTerms]);
        const newProducts = newTerms
            .map(term => term.productName)
            .filter(productName => !products.includes(productName));
        if (newProducts.length > 0) {
            setProducts(prevProducts => [...prevProducts, ...newProducts]);
        }
    };

    return (
        <div style={{ padding: '2rem', position: 'relative' }}>
            <Box
                component="img"
                src={welcomes}
                alt="Welcome"
                style={{
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '180px',
                    height: '180px',
                    zIndex: 10,
                }}
            />

            <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold', marginRight: '10px' }}>
                    Add Term
                </Typography>
                <MascotWithTooltip instruction="Use this section to add new terms to the database." mascotImage={notes} />
            </Box>
            <AddTermForm onTermAdded={handleTermAdded} />

            {successMessage && (
                <TurtleMascot message={successMessage} type="success" />
            )}

            <Box style={{ display: 'flex', alignItems: 'center', marginTop: '2rem', marginBottom: '20px' }}>
                <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold', marginRight: '10px' }}>
                    Search Terms
                </Typography>
                <MascotWithTooltip instruction="Use this section to search for terms in the database." mascotImage={magnify} />
            </Box>
            <SearchBar
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
                onSearchClick={handleSearchClick}
            />

            <Box style={{ display: 'flex', alignItems: 'center', marginTop: '2rem', marginBottom: '20px' }}>
                <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold', marginRight: '10px' }}>
                    Term List
                </Typography>
                <MascotWithTooltip instruction="This list displays all the terms in the database. Click on a term to add a comment, and hover over the 'Comments' label to view existing comments." mascotImage={dict} />
            </Box>
            <TermList
                terms={terms}
                onTermSelect={handleTermSelect}
                onStatusChange={handleStatusChange}
            />

            {selectedTermId && (
                <>
                    <div ref={commentFormRef}>
                        <CommentForm
                            termId={selectedTermId}
                            language={selectedLanguage}
                            onCommentAdded={handleCommentAdded}
                        />
                    </div>
                    {commentSuccessMessage && (
                        <TurtleMascot message={commentSuccessMessage} type="success" />
                    )}
                </>
            )}

            <Box style={{ display: 'flex', alignItems: 'center', marginTop: '2rem', marginBottom: '20px' }}>
                <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold', marginRight: '10px' }}>
                    Translate Text
                </Typography>
                <MascotWithTooltip instruction="Translate your text using the terms stored in the database, and see the translation displayed below." mascotImage={translates} />
            </Box>
            <TranslationForm
                products={products}
                languages={['en', 'da', 'fi', 'is', 'no', 'sv']}
                onTranslate={handleTranslation}
            />
            <TranslatedText translatedTable={translatedTable} />

            <Box style={{ display: 'flex', alignItems: 'center', marginTop: '2rem', marginBottom: '20px' }}>
                <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold', marginRight: '10px' }}>
                    Upload Excel File
                </Typography>
                <MascotWithTooltip instruction="Upload an Excel file to add multiple terms at once." mascotImage={rocket} />
            </Box>
            <FileUploadInstructions />
            <FileUpload onTermsAdded={handleTermsAdded} />
        </div>
    );
}

export default Home;
