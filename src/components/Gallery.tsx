import {
    MDBCol,
    MDBRow,
} from 'mdb-react-ui-kit';
import { IPost } from '../helpers/types';
import React from 'react';
import { BASE } from '../helpers/deafult';

interface Props {
    posts: IPost[]
}

export function Gallery({ posts }: Props) {
    return (
        <MDBRow>
            <MDBCol lg={4} md={12} className='mb-4 mb-lg-0'>
                {
                    posts.map(post => {
                        return <React.Fragment key={post.id}>
                            <p>{post.title}</p>
                            <span>{post.likes.length}</span>
                            <img style={{width:40}} src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/heart-512.png"/>
                            
                            <img
                                src={BASE + post.picture}
                                className='shadow-1-strong rounded mb-4'
                                alt='Boat on Calm Water'
                                style={{ width: 200 }}
                            />
                          
                        </React.Fragment>
                    })
                }
            </MDBCol>
        </MDBRow>
    );
}