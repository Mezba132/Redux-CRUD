import React, { Component } from 'react';
import Book from '../components/Book';
import { connect } from 'react-redux';
import { fetchBooks, deleteBook } from '../actions/book.actions';
import { history } from '../index';

class Books extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.onFetch();
    }

    handleEdit = (book) => {
        history.push({
            pathname: `/edit/${book._id}`,
            state: {
                book: book
            }
        })
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
                                        <Book 
                                        key={book._id} 
                                        book={book}
                                        onEdit={this.handleEdit.bind(this)}
                                        onDelete={this.props.onDelete}
                                        />
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
        },
        onDelete : (id) => {
            dispatch(deleteBook(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Books);