import React, { Component } from 'react';
import Book from './Book';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/book.actions'

class Books extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.onFetch();
    }

    render() {
        if(this.props.isLoading) {
            return(
                <div>
                   <p>LOADING...........</p>
                </div>
            )
        }
        else if (this.props.error) {
            return (
                <div className='alert alert-danger' role='alert'>
                    {this.props.error.message}
                </div>
            )
        }
        else {
            return (
                <div>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Year</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.books.map(book => {
                                    return (
                                        <Book key={book.title} book={book}/>
                                    )
                                }) 
                            }
                        </tbody>
                    </table>
                </div>
        )}
    }
}

const mapStateToProps = state => {
    return {
        isLoading : state.booksData.isLoading,
        books: state.booksData.books || [],
        error : state.booksData.error || null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetch : () => {
            dispatch(fetchBooks())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Books);