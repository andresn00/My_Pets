import React, { useState, useEffect } from 'react'

import { getPetById } from '../pets'

import { Col, Row, Container, Card, Breadcrumb, Form } from 'react-bootstrap'

const Pets = (props) => {
    // const petId = props.match.params.id
    const petId = 'qhn2bPogJYc2q2mM1uE1'
    const [pet, setPet] = useState({})
    useEffect(() => {
        const getUsers = async () => {
            const p = await getPetById(petId)
            setPet({ ...p, fechaNacimiento:  new Date(p.fechaNacimiento.toMillis()).toLocaleDateString('en-GB') })
        }
        getUsers()

    }, [])

    return (
        <Container className='m-0' fluid >
            <Row style={{ minHeight: '100vh' }}>
                <Col className='pt-3' lg={3} md={4}
                    style={{ backgroundColor: '#46ce46', color: 'black' }}
                >
                    <Card style={{ width: '225px', height: '225px', overflow: 'hidden' }}
                        className='rounded-circle mx-auto'>
                        <Card.Img variant="top" className='img-thumbnail'
                            src="https://www.jamiesale-cartoonist.com/wp-content/uploads/dog-12.png" />
                    </Card>
                    {/* <Image style={{ width: '225px', height: '225px', overflow: 'hidden' }}
                        roundedCircle thumbnail
                        src='https://www.pngfind.com/pngs/m/84-842250_cute-dog-cartoon-png-www-pixshark-com-images.png'
                    /> */}

                    <h1 className='text-center pt-1'>{pet.nombre}</h1>
                    <Form className='basicPetInfo'>
                        <Form.Group controlId="propietario">
                            <Form.Label>Propietario</Form.Label>
                            <Form.Control plaintext readOnly defaultValue={pet.propietario} />
                        </Form.Group>
                        <Form.Group controlId="fechaNacimiento">
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <Form.Control plaintext readOnly defaultValue={pet.fechaNacimiento} />
                        </Form.Group>
                        <Form.Group controlId="especie">
                            <Form.Label>Especie</Form.Label>
                            <Form.Control plaintext readOnly defaultValue={pet.especie} />
                        </Form.Group>
                        <Form.Group controlId="raza">
                            <Form.Label>Raza</Form.Label>
                            <Form.Control plaintext readOnly defaultValue={pet.raza} />
                        </Form.Group>
                        <Form.Group controlId="sexo">
                            <Form.Label>Sexo</Form.Label>
                            <Form.Control plaintext readOnly defaultValue={pet.sexo} />
                        </Form.Group>
                        <Form.Group controlId="color">
                            <Form.Label>Color</Form.Label>
                            <Form.Control plaintext readOnly defaultValue={pet.color} />
                        </Form.Group>
                    </Form>


                </Col>
                <Col className='pt-3'>
                    <h1>Historial Médico</h1><hr />
                    <Breadcrumb style={{ width: 'fit-content' }}>
                        <Breadcrumb.Item active>Desparacitaciones</Breadcrumb.Item>
                        <Breadcrumb.Item>Vacunas</Breadcrumb.Item>
                        <Breadcrumb.Item>Otros</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
        </Container>
    )
}

export default Pets
