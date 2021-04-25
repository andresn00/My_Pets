import React, { useState, useEffect } from 'react'

import { getPetById } from '../pets'

import { Col, Row, Container, Card, Form, Tab, Tabs } from 'react-bootstrap'

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
                    style={{ backgroundColor: '#007BFF', color: '#f6f6f6' }}
                >
                    <Card style={{ width: '225px', height: '225px', overflow: 'hidden' }}
                        className='rounded-circle mx-auto'>
                        <Card.Img variant="top"
                            src="https://t2.ea.ltmcdn.com/es/images/1/6/2/img_10_curiosidades_del_golden_retriever_21261_orig.jpg" />
                    </Card>
                    {/* <Image style={{ width: '225px', height: '225px', overflow: 'hidden' }}
                        roundedCircle thumbnail
                        src='https://www.pngfind.com/pngs/m/84-842250_cute-dog-cartoon-png-www-pixshark-com-images.png'
                    /> */}

                    <h1 className='text-center pt-1'>{pet.nombre}</h1>
                    <Form className='basicPetInfo'>
                        <Form.Group controlId="propietario">
                            <Form.Text>Propietario</Form.Text>
                            <Form.Control plaintext readOnly defaultValue={pet.propietario} />
                        </Form.Group>
                        <Form.Group controlId="fechaNacimiento">
                            <Form.Text>Fecha de Nacimiento</Form.Text>
                            <Form.Control plaintext readOnly defaultValue={pet.fechaNacimiento} />
                        </Form.Group>
                        <Form.Group controlId="especie">
                            <Form.Text>Especie</Form.Text>
                            <Form.Control plaintext readOnly defaultValue={pet.especie} />
                        </Form.Group>
                        <Form.Group controlId="raza">
                            <Form.Text>Raza</Form.Text>
                            <Form.Control plaintext readOnly defaultValue={pet.raza} />
                        </Form.Group>
                        <Form.Group controlId="sexo">
                            <Form.Text>Sexo</Form.Text>
                            <Form.Control plaintext readOnly defaultValue={pet.sexo} />
                        </Form.Group>
                        <Form.Group controlId="color">
                            <Form.Text>Color</Form.Text>
                            <Form.Control plaintext readOnly defaultValue={pet.color} />
                        </Form.Group>
                    </Form>


                </Col>
                <Col className='pt-3'>
                    <h1>Historial Médico</h1><hr />
                    <Tabs defaultActiveKey='desparacitaciones'>
                        <Tab eventKey='desparacitaciones' title='Desparacitaciones'>
                            D
                        </Tab>
                        <Tab eventKey='vacunas' title='Vacunas'>
                            V
                        </Tab>
                        <Tab eventKey='otros' title='Otros'>
                            O
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    )
}

export default Pets
