import React from 'react'
import './App.css'
import {getAll, search} from "./BooksAPI";
import Book from "./Book";

class BooksApp extends React.Component {
    constructor(props) {
        super(props);
    getAll().then(value => {
        this.setState({books: value })
        console.log(value)
    })
    }
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        queryResults: [],
        books: []
    }
    render() {
        const {books, queryResults} = this.state
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <button className="close-search"
                                    onClick={() => this.setState({showSearchPage: false})}>Close
                            </button>
                            <div className="search-books-input-wrapper">
                                <input name="searchTxt" type="text" placeholder="Search by title or author"
                                       onChange={this.getNewQuery}/>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {queryResults.length > 0 &&
                                        (queryResults.map(book =>
                                            <li key={book.id}><Book book={book} onChange={this.onChange}/></li>)
                                        )}
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid"></ol>
                        </div>
                    </div>
                ) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Currently Reading</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {books.filter(book =>
                                                book.shelf === 'currentlyReading'
                                            ).map(current => <li key={current.id}><Book book={current}
                                                                                           onChange={this.onChange}/>
                                            </li>)}
                                        </ol>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want to Read</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {books.filter(book =>
                                                book.shelf === 'wantToRead'
                                            ).map(current => <li key={current.id}><Book book={current}
                                                                                           onChange={this.onChange}/>
                                            </li>)}
                                        </ol>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {books.filter(book =>
                                                book.shelf === 'read'
                                            ).map(current => <li key={current.id}><Book book={current}
                                                                                           onChange={this.onChange}/>
                                            </li>)}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="open-search">
                            <button onClick={() => this.setState({showSearchPage: true})}>Add a book</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    getNewQuery = (e) => {
        const {queryResults} = this.state
        if(e.target.value !== '')
        search(e.target.value).then(value => {

            this.setState({queryResults: value})
        })
    }
    onChange = (e, selection) => {
        const {books} = this.state
        selection.shelf = e.target.value
       const index = books.findIndex(book => book.title === selection.title)
        index > -1 ? books[index].shelf = e.target.value : books.push(selection)
        this.setState({books: books})
    }
}
export default BooksApp
