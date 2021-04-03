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
                                    onChange = {this.handleValueChange('year')}
                                />
                            </div>
                            <div className='form-group'>
                                <button onClick={this.handleSubmit.bind(this)} className='btn btn-primary'>Submit</button>
                                <button className='btn btn-danger'>Cancel</button>
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