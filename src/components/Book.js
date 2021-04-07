import React from 'react';

const Book = ({book, onEdit, onDelete}) => (
    <React.Fragment>
            <tr>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>
                    <button onClick={() => onDelete(book)} type='button' className='btn btn-danger'>Delete</button>
                    <button onClick={() => onEdit(book)} type='button' className='btn btn-info'>Edit</button> 
                </td>
            </tr>
    </React.Fragment>
)

export default Book;