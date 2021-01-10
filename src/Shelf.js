import React from 'react';
import PropTypes from 'prop-types';
import './App.css'
Shelf.propTypes = {
    children: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired
};

function Shelf(props) {

    const {children, shelf} = props

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {children}
                </ol>
            </div>
        </div>
    );
}

export default Shelf;