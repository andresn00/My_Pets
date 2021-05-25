import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getUserPets, addPet } from '../pets'

import { FaPlus, FaEye } from 'react-icons/fa'
import {
    Card, Container, Row, Col, Button,
    ListGroup, ListGroupItem, Badge
} from 'react-bootstrap'

import FormPet from './FormPet'

const Carnets = (props) => {
    console.log('props', props);
    const { id: userId = ''} = useParams()
    const [pets, setPets] = useState([])

    const [modalShow, setModalShow] = useState(false)

    useEffect(() => {
        const getPets = async () => {
            const pets = await getUserPets(userId)
            setPets(pets)
            console.log('pets', pets)
        }
        getPets()
    }, [])

    const history = useHistory()

    const handleCarnetClick = (id) => {
        history.push(`/pets/${id}`)
    }

    const AddPet = (p) => {
        p.propietario = userId
        console.log('finalPet', p);
        addPet(p)
        setPets([...pets, p])
    }

    const calcAge = (bd = new Date()) => {
        const date = new Date()
        const birthday = bd
        const years = date.getFullYear() - birthday.getFullYear()
        var months = (date.getMonth() + 1) - (birthday.getMonth() + 1)
        months += months < 0 ? 12 : 0
        return { years, months }
    }
    const getAgeInString = (p) => {
        const ageInString = p?.years + ' años , ' + p?.months + ' meses'
        return ageInString
    }

    return (
        <>
            <Container className='mx-0 mt-4'>
                <Row className='mb-4'>
                    <Col>
                        <Button onClick={() => setModalShow(true)}><FaPlus /> Nuevo</Button>
                    </Col>

                </Row>
                <Row>
                    {/* <Col xs={3} className='mb-3'>
                        <Card style={{ width: '16rem' }}>
                            <Card.Body>
                                <Button variant="primary" onClick={() => { }}>
                                    Nueva mascota
                    </Button>
                            </Card.Body>
                        </Card>
                    </Col> */}
                    {pets.map((pet, index) => (
                        <Col xs={3} key={index} className='mx-0 mb-3'>
                            <Card style={{ width: '16rem' }} onClick={() => handleCarnetClick(pet.id)}>
                                <Card.Img variant="top" src="https://www.ecestaticos.com/image/clipping/79776773aab795837282c7d4947abaf7/por-que-nos-parece-que-los-perros-sonrien-una-historia-de-30-000-anos.jpg" />
                                <Card.Body className='pt-3 pb-1'>
                                    <Card.Title><h4 className='font-weight-bold'>{pet.nombre}</h4></Card.Title>
                                    <hr />
                                    <div>
                                        <div className='mb-2'>{pet.raza}</div>
                                        <div className='mb-2'>
                                            {getAgeInString(calcAge(pet.fechaNacimiento.toDate()))}
                                        </div>
                                    </div>
                                </Card.Body>
                                {/* <ListGroup variant='flush'>
                                    <ListGroupItem className='py-2'>Raza: {pet.raza}</ListGroupItem>
                                    <ListGroupItem className='py-2'>
                                        Edad: {getAgeInString(calcAge(pet.fechaNacimiento.toDate()))}
                                    </ListGroupItem>
                                </ListGroup> */}
                                <Card.Footer>
                                    {pet.citasPendientes > 0 ?
                                        <Badge variant='warning' className='mr-2'>
                                            {pet.citasPendientes}
                                        </Badge> :
                                        'No tiene '
                                    }
                                    citas pendientes
                                </Card.Footer>
                                <div className='cardDiv rounded d-flex align-items-center justify-content-center'>
                                    <FaEye />
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <FormPet show={modalShow}
                onHide={() => setModalShow(false)}
                savefunction={(p) => AddPet(p)}
            />
        </>
    )
}

export default Carnets
