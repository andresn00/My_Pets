import React, {useState, useEffect} from 'react'

import {getPetById} from '../pets'

import { Col, Row, Container, Card, Image } from 'react-bootstrap'

const Pets = (props) => {
    // const petId = props.match.params.id
    const petId = 'qhn2bPogJYc2q2mM1uE1'
    const [pet, setPet] = useState({})
    useEffect(() => {
        const getUsers = async () => {
            const pet = await getPetById(petId)
            setPet(pet)
        }
        getUsers()

    }, [])

    return (
        <Container className='m-0' fluid >
            <Row className='pt-5' style={{ minHeight: '100vh' }}>
                <Col className='pt-3' lg={3} md={4}
                    style={{ backgroundColor: '#46ce46', color:'black' }}
                >
                    <Card style={{ width: '225px', height: '225px', overflow:'hidden'}}
                        className='rounded-circle mx-auto'>
                        <Card.Img variant="top" className='img-thumbnail'
                            src="https://www.jamiesale-cartoonist.com/wp-content/uploads/dog-12.png" />
                    </Card>
                    {/* <Image style={{ width: '225px', height: '225px', overflow: 'hidden' }}
                        roundedCircle thumbnail
                        src='https://www.pngfind.com/pngs/m/84-842250_cute-dog-cartoon-png-www-pixshark-com-images.png'
                    /> */}

                    <h1 className='text-center pt-1'>{pet.nombre}</h1>
                </Col>
                <Col className='pt-3'>Citas</Col>
            </Row>
        </Container>
    )
}

export default Pets
