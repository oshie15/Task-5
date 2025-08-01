import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Download, ChevronDown, ChevronUp, ThumbsUp } from 'lucide-react';
import { getLanguageOptions, getLanguageConfig } from './config';
import './App.css';

const App = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expandedRows, setExpandedRows] = useState(new Set());
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'gallery'
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Control parameters
    const [region, setRegion] = useState(getLanguageConfig().locale);
    const [seed, setSeed] = useState(42);
    const [avgLikes, setAvgLikes] = useState(5);
    const [avgReviews, setAvgReviews] = useState(4.7);

    const regions = getLanguageOptions();

    const fetchBooks = useCallback(async (page = 1, append = false) => {
        setLoading(true);
        try {
            const response = await axios.get('/.netlify/functions/api/books', {
                params: {
                    page,
                    limit: 20,
                    seed,
                    region,
                    avgLikes,
                    avgReviews
                }
            });

            const newBooks = response.data;

            if (append) {
                setBooks(prev => [...prev, ...newBooks]);
            } else {
                setBooks(newBooks);
                setExpandedRows(new Set());
            }

            // For infinite scrolling, assume there are more books if we got the requested amount
            const requestedLimit = 20;
            setHasMore(newBooks.length === requestedLimit);
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    }, [seed, region, avgLikes, avgReviews]);

    // Fetch books when parameters change
    useEffect(() => {
        fetchBooks(1, false);
    }, [fetchBooks]);

    // Infinite scroll handler
    const handleScroll = useCallback(() => {
        if (loading || !hasMore) return;

        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= documentHeight - 100) {
            fetchBooks(currentPage + 1, true);
        }
    }, [loading, hasMore, currentPage, fetchBooks]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const generateRandomSeed = () => {
        const newSeed = Math.floor(Math.random() * 1000000);
        setSeed(newSeed);
    };

    const toggleRowExpansion = (index) => {
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(index)) {
            newExpandedRows.delete(index);
        } else {
            newExpandedRows.add(index);
        }
        setExpandedRows(newExpandedRows);
    };

    const exportToCSV = async () => {
        try {
            const response = await axios.get('/.netlify/functions/api/export-csv', {
                params: {
                    pages: Math.ceil(books.length / 20),
                    seed,
                    region,
                    avgLikes,
                    avgReviews
                },
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'books.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error exporting CSV:', error);
        }
    };

    const getProbabilityExplanation = (value, type) => {
        if (value === 0) {
            return `${type}: 0 (no ${type})`;
        } else if (value <= 1) {
            const percentage = Math.round(value * 100);
            return `${type}: ${value} (${percentage}% chance of 1 ${type.slice(0, -1)})`;
        } else {
            return `${type}: ${value} (average per book)`;
        }
    };

    const BookCover = ({ cover, likes }) => (
        <div className="book-cover">
            <h3>{cover.title}</h3>
            <p>{cover.author}</p>
            <button className="likes-btn">
                <ThumbsUp size={16} />
                {likes}
            </button>
        </div>
    );

    const BookDetails = ({ book }) => (
        <div className="book-details">
            <BookCover cover={book.cover} likes={book.likes} />
            <div className="book-info">
                <h2>{book.title}</h2>
                <p>Paperback</p>
                <p>by {book.author}</p>
                <p>{book.publisher}</p>

                {book.reviews.length > 0 && (
                    <div className="reviews-section">
                        <h3>Reviews</h3>
                        {book.reviews.map((review, index) => (
                            <div key={index} className="review-item">
                                <div className="review-text">"{review.text}"</div>
                                <div className="review-author">- {review.author}, {review.company}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const TableView = () => (
        <div className="table-container">
            <div className="table-header">
                <span>#</span>
                <span>ISBN</span>
                <span>Title</span>
                <span>Author(s)</span>
                <span>Publisher</span>
            </div>
            <table className="book-table">
                <tbody>
                    {books.map((book) => (
                        <React.Fragment key={book.index}>
                            <tr className={expandedRows.has(book.index) ? 'expanded' : ''}>
                                <td>
                                    <button
                                        className="expand-btn"
                                        onClick={() => toggleRowExpansion(book.index)}
                                    >
                                        {expandedRows.has(book.index) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>
                                    {book.index}
                                </td>
                                <td>{book.isbn}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                            </tr>
                            {expandedRows.has(book.index) && (
                                <tr className="expanded-row">
                                    <td colSpan="5">
                                        <BookDetails book={book} />
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {loading && (
                <div className="loading">
                    <div className="spinner"></div>
                    Loading more books...
                </div>
            )}
        </div>
    );

    const GalleryView = () => (
        <div className="gallery-view">
            {books.map((book) => (
                <div key={book.index} className="book-card">
                    <div
                        className="book-card-cover"
                        style={{ backgroundColor: book.cover.color }}
                    >
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                    </div>
                    <div className="book-card-content">
                        <div className="book-card-title">{book.title}</div>
                        <div className="book-card-author">{book.author}</div>
                        <div className="book-card-publisher">{book.publisher}</div>
                        <div className="book-card-likes">
                            <ThumbsUp size={14} />
                            {book.likes} likes
                        </div>
                    </div>
                </div>
            ))}
            {loading && (
                <div className="loading">
                    <div className="spinner"></div>
                    Loading more books...
                </div>
            )}
        </div>
    );

    return (
        <div className="app">
            <div className="container">
                <div className="filter-bar">
                    <div className="control-item">
                        <label>Language</label>
                        <select className="dropdown" value={region} onChange={(e) => setRegion(e.target.value)}>
                            {regions.map(region => (
                                <option key={region.value} value={region.value}>
                                    {region.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="control-item">
                        <label>Seed</label>
                        <div className="seed-input-group">
                            <input
                                type="text"
                                value={seed}
                                onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
                            />
                            <button className="shuffle-btn" onClick={generateRandomSeed}>
                                &#x21bb;
                            </button>
                        </div>
                    </div>

                    <div className="control-item">
                        <label>Likes</label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.1"
                            value={avgLikes}
                            onChange={(e) => setAvgLikes(parseFloat(e.target.value))}
                            className="likes-slider"
                        />
                        <div className="probability-hint">
                            {getProbabilityExplanation(avgLikes, 'Likes')}
                        </div>
                    </div>

                    <div className="control-item">
                        <label>Review</label>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={avgReviews}
                            onChange={(e) => setAvgReviews(parseFloat(e.target.value))}
                            className="review-input"
                        />
                    </div>

                    <div className="control-item">
                        <label>View</label>
                        <div className="view-toggle">
                            <button
                                className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                                onClick={() => setViewMode('table')}
                            >
                                <span className="toggle-icon">&#x2630;</span>
                                <span className="toggle-text">Table</span>
                            </button>
                            <button
                                className={`toggle-btn ${viewMode === 'gallery' ? 'active' : ''}`}
                                onClick={() => setViewMode('gallery')}
                            >
                                <span className="toggle-icon">&#x25A3;</span>
                                <span className="toggle-text">Gallery</span>
                            </button>
                        </div>
                    </div>

                    <div className="control-item">
                        <label>&nbsp;</label>
                        <button className="export-btn" onClick={exportToCSV}>
                            <Download size={16} />
                            Export CSV
                        </button>
                    </div>
                </div>

                {viewMode === 'table' ? <TableView key={`${avgLikes}-${avgReviews}-${seed}-${region}`} /> : <GalleryView key={`${avgLikes}-${avgReviews}-${seed}-${region}`} />}
            </div>
        </div>
    );
};

export default App; 