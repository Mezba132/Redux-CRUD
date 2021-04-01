import React, { Component } from 'react';

class createBook extends Component {
    render() {
        return(
            <div className='create-book'>
                <form>
                    <div className='form-group'>
                        <label>Title</label>
                        <input 
                            type='text' 
                            className='form-control'
                            placeholder='Enter Your Title'
                            name='title'
                        />
                    </div>
                    <div className='form-group'>
                    <label>Author</label>
                        <input 
                            type='text' 
                            className='form-control'
                            placeholder='Enter Author Name'
                            name='Author'
                        />
                    </div>
                    <div className='form-group'>
                    <label>Author</label>
                        <input 
                            type='text' 
                            className='form-control'
                            placeholder='Enter Author Name'
                            name='Author'
                        />
                    </div>
                    <div>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                        <button type='button' className='btn btn-danger'>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default createBook;