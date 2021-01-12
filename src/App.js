import React from 'react'
import './App.css'
import {getAll, search, update} from "./BooksAPI";
import Book from "./Book";
import Shelf from "./Shelf";
import SearchPage from "./SearchPage";
import {Link, Route} from "react-router-dom";
import add from './icons/add.svg'

class BooksApp extends React.Component {
    constructor(props) {
        super(props);
    getAll().then(value => {
        this.setState({books: value })
    })
    }
    state = {
        showSearchPage: false,
        queryResults: [],
        books: []
    }
    render() {
        const {books, queryResults} = this.state

        const currentlyReadingShelf = books.filter(book => book.shelf === 'currentlyReading')
            .map(current => <li key={current.id}><Book book={current} onChange={this.onChange}/></li>)
        const wantToReadShelf = books.filter(book => book.shelf === 'wantToRead')
            .map(current => <li key={current.id}><Book book={current} onChange={this.onChange}/></li>)
        const readShelf = books.filter(book => book.shelf === 'read')
            .map(current => <li key={current.id}><Book book={current} onChange={this.onChange}/></li>)
        const results = queryResults.map(book => <li key={book.id}><Book book={book} onChange={this.onChange}/></li>)

        return (
            <div className="app">
                <Route exact path="/search" render={() => (
                    <SearchPage children={results} newQuery={this.getNewQuery} handleClick={this.handleExitClick}/>
                    )}/>
                 <Route exact path="/" render={() => (
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <Shelf children={currentlyReadingShelf}  shelf="Currently Reading"/>
                            <Shelf children={wantToReadShelf} shelf="Want To Read"/>
                            <Shelf children={readShelf} shelf="Read"/>
                        </div>
                    </div>
                    <div >
                        <Link to="/search" className="open-search" >Add a book</Link>
                    </div>
                </div>
                )}/>
            </div>
        )
    }

    handleExitClick = () => this.setState({showSearchPage: false, queryResults: []})

    getNewQuery = (e) => {
        const {books} = this.state
        if(e.target.value !== '') {
            search(e.target.value).then(queries => {
                if (queries.length > 0) {
                    queries.forEach(query => {
                        const book = books.find(book => book.id === query.id)
                        book ? query.shelf = book.shelf : query.shelf = 'none'
                    })
                    this.setState({queryResults: queries})
                } else {
                    this.setState({queryResults: []})
                }
            })
        } else {
            this.setState({queryResults: []})
        }
    }

    onChange = (e, selection) => {
        const {books} =this.state
        selection.shelf = e.target.value
        update(selection, e.target.value)
        const index = books.findIndex(book => book.title === selection.title)
        index > -1 ? books[index].shelf = e.target.value : books.push(selection)
        this.setState({books: books})
    }
}
export default BooksApp
