import React, { useState, useEffect } from 'react'

import { getPetById } from '../pets'
import { getUserById } from '../users'
import PetsTable from './PetsTable'

import { Col, Row, Container, Card, Form, Tab, Tabs, Button } from 'react-bootstrap'
import FormCita from './FormCita'

const Pets = (props) => {
    // const petId = props.match.params.id
    const petId = 'qhn2bPogJYc2q2mM1uE1'
    const [pet, setPet] = useState({
        propietario: '',
        fechaNacimiento: new Date(),
        especie: '',
        raza: '',
        sexo: '',
        color: '',
    })
    const [propietario, setPropietario] = useState({nombre: ''})
    const [modalShow, setModalShow] = useState(false)
    const [tabActiveKey, setTabActiveKey] = useState(1)

    useEffect(() => {
        const getPet = async () => {
            const p = await getPetById(petId)
            setPet({
                ...p,
                fechaNacimiento: p.fechaNacimiento.toDate(),
            })
            const propietario = await getUserById(p.propietario)
            setPropietario(propietario)
        }
        getPet()

    }, [])

    const calcAge = (bd) => {
        const date = new Date()
        const birthday = bd
        const years = date.getFullYear() - birthday.getFullYear()
        var months = (date.getMonth() + 1) - (birthday.getMonth() + 1)
        months += months < 0 ? 12 : 0
        return { years, months }
    }
    const getAgeInString = (p) => {
        const ageInString = '(' + p?.years + ' años , ' + p?.months + ' meses)'
        return ageInString
    }
    const edad = getAgeInString(calcAge(pet.fechaNacimiento))
    return (
        <Container className='m-0' fluid >
            <Row style={{ minHeight: '100vh' }}>
                <Col className='pt-3' lg={3} md={4}
                    style={{ backgroundColor: '#007BFF', color: '#f6f6f6' }}
                >
                    <Card style={imgStyle}
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
                            <Form.Control plaintext readOnly value={propietario.nombre} onChange={() => { }} />
                        </Form.Group>
                        <Form.Group controlId="fechaNacimiento">
                            <Form.Text>Fecha de Nacimiento</Form.Text>
                            <Form.Row>
                                <Col>
                                    <Form.Control plaintext readOnly type='date'
                                        value={pet.fechaNacimiento.toISOString().substr(0, 10)} onChange={() => { }} />
                                </Col>
                                <Col className='my-2'>{edad}</Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group controlId="especie">
                            <Form.Text>Especie</Form.Text>
                            <Form.Control plaintext readOnly value={pet.especie} onChange={() => { }} />
                        </Form.Group>
                        <Form.Group controlId="raza">
                            <Form.Text>Raza</Form.Text>
                            <Form.Control plaintext readOnly value={pet.raza} onChange={() => { }} />
                        </Form.Group>
                        <Form.Group controlId="sexo">
                            <Form.Text>Sexo</Form.Text>
                            <Form.Control plaintext readOnly value={pet.sexo} onChange={() => { }} />
                        </Form.Group>
                        <Form.Group controlId="color">
                            <Form.Text>Color</Form.Text>
                            <Form.Control plaintext readOnly value={pet.color} onChange={() => { }} />
                        </Form.Group>
                    </Form>


                </Col>
                <Col className='pt-3'>
                    <h1>Historial Médico</h1><hr />
                    <Tabs defaultActiveKey={1} onSelect={(k) => setTabActiveKey(k)}>
                        <Tab eventKey={1} title='Desparacitaciones'>
                            <PetsTable tipo={1} petId={petId}
                                onClick={() => setModalShow(true)} />
                        </Tab>
                        <Tab eventKey={2} title='Vacunas'>
                            <PetsTable tipo={2} petId={petId}
                                onClick={() => setModalShow(true)} />
                        </Tab>
                        <Tab eventKey={3} title='Otros'>
                            <PetsTable tipo={3} petId={petId}
                                onClick={() => setModalShow(true)} />
                        </Tab>
                    </Tabs>
                    <FormCita
                        tipo={tabActiveKey}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Pets

//Estilos
const imgStyle = {
    width: '225px',
    height: '225px',
    overflow: 'hidden',
    borderStyle: 'solid',
    borderWidth: 'thick',
    borderColor: 'white',
}