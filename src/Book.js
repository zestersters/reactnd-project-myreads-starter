import React from 'react';
import PropTypes from 'prop-types';
import './App.css'

function Book(props) {
    const {book, onChange} = props
    const handleChange = (e) => {
        onChange(e, book)
    }
    const image =  book.imageLinks ? `url(${book.imageLinks.thumbnail})` : ''
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: image}}></div>
                <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={handleChange}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors ? book.authors.join('') : ''}</div>
        </div>
    );
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};
export default Book;