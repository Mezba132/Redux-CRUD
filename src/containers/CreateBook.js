import React, { Component } from 'react';
import { createBook } from '../actions/book.actions';
import { connect } from 'react-redux';

class CreateBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            author: '',
            year: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onAdd(this.state);
    }

    handleValueChange = values => e => {
        this.setState({
            [values] : e.target.value
        });
    }

    handleCancelEvent = (e) => {
        e.preventDefault();
        this.setState({
            title: '',
            author: '',
            year: ''
        })
    }

    componentWillMount() {

        // fetch and set value while edit clicked
        if(this.props.location && this.props.location.state) {
            const book = this.props.location.state.book;

            this.setState({
                id: book._id,
                title: book.title,
                author: book.author,
                year: book.year
            })
        }

    }

    render() {
            if(this.props.isLoading) {
                return(
                    <div>
                    <p>LOADING...........</p>
                    </div>
                )
            }
            else if(this.props.error) {
                return (
                    <div className='alert alert-danger' role='alert'>
                        {this.props.error.message}
                    </div>
                )
            }
            else {
                return (
                    <div className='create-book'>
                        <form>
                            <div className='form-group'>
                                <label>Title</label>
                                <input 
                                    type='text' 
                                    className='form-control'
                                    placeholder='Enter Your Title'
                                    name='title'
                                    value={this.state.title}
                                    onChange = {this.handleValueChange('title')}
                                />
                            </div>
                            <div className='form-group'>
                            <label>Author</label>
                                <input 
                                    type='text' 
                                    className='form-control'
                                    placeholder='Enter Author Name'
                                    name='author'
                                    value={this.state.author}
                                    onChange = {this.handleValueChange('author')}
                                />
                            </div>
                            <div className='form-group'>
                            <label>Year</label>
                                <input 
                                    type='text' 
                                    className='form-control'
                                    placeholder='Enter Published Year'
                                    name='year'
                                    value={this.state.year}
                                    onChange = {this.handleValueChange('year')}
                                />
                            </div>
                            <div className='form-group'>
                                <button onClick={this.handleSubmit.bind(this)} className='btn btn-primary'>Submit</button>
                                <button onClick={this.handleCancelEvent.bind(this)} className='btn btn-danger'>Cancel</button>
                            </div>
                        </form>
                    </div>
                )
            }
    }
}

const mapStateToProps = state => {
    return {
        isLoading : state.booksData.isLoading,
        error : state.booksData.error || null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAdd: book => {
            dispatch(createBook(book));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateBook);