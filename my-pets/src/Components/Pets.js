import React from 'react'

import { Col, Row, Container, Image } from 'react-bootstrap'

const Pets = (props) => {
    // const petId = props.match.params.id
    const petId = 'qhn2bPogJYc2q2mM1uE1'
    return (
        <Container className='m-0' fluid >
            <Row className='pt-5' style={{ minHeight: '100vh' }}>
                <Col className='pt-3' lg={3} md={4}
                    style={{ backgroundColor: '#6aef6a' }}
                >
                    
                </Col>
                <Col className='pt-3'>Citas</Col>
            </Row>
        </Container>
    )
}

export default Pets
