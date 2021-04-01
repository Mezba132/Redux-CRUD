/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { data }  from '../data';
import Book from './Book';

class Books extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Year</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           data.map(book => {
                               console.log(book);
                               return (
                                   <Book key={book.id} book={book}/>
                               )
                           }) 
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Books;