import React from 'react';
import PropTypes from 'prop-types';
import './App.css'
import {Link} from "react-router-dom";

SearchPage.propTypes = {
    newQuery: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired
};

function SearchPage(props) {
    const {children, newQuery} = props
    return (
        <>
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
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
        </>
    );
}

export default SearchPage;