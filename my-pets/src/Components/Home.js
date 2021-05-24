import React from 'react'

import { Carousel } from 'react-bootstrap'


const Home = () => {
    return (
        <div>
            <div style={{width: '100%'}} className='text-center'>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn.shopify.com/s/files/1/0521/6282/2320/files/sl2-h2.jpg?v=1609275147"
                            alt="First slide"
                        />
                        <Carousel.Caption style={{color: 'black'}}>
                            <h1>My Pets</h1>
                            <h3>Cuida de tu mascota.</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}

export default Home
