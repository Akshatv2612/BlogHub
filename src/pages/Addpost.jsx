import React from 'react'
import {Container, PostForm} from '../components/index.js'

function Addpost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm post={null}/>
        </Container>
    </div>
  )
}

export default Addpost