import React from 'react';
import PropTypes from 'prop-types';
import './App.css'

SearchPage.propTypes = {
    handleClick: PropTypes.func.isRequired,
    newQuery: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired
};

function SearchPage(props) {
    const {children, handleClick, newQuery} = props
    return (

        <div className="search-books">
            <div className="search-books-bar">
                <button className="close-search"
                        onClick={handleClick}>Close
                </button>
                <div className="search-books-input-wrapper">
                    <input name="searchTxt" type="text" placeholder="Search by title or author"
                           onChange={newQuery}/>
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {children.length > 0 && children}
                </ol>
            </div>
        </div>
    );
}

export default SearchPage;