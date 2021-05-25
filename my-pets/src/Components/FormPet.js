import React, { useState, useEffect } from 'react'
import { convertToTimestamp } from '../firestore'

import { Modal, Button, Form, Col, InputGroup, FormGroup } from 'react-bootstrap'
import { FaEraser, FaCircle } from "react-icons/fa";

import { getEstadoText } from '../utils'

const FormPet = (props) => {
    const [nombre, setNombre] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState()
    const [especie, setEspecie] = useState('')
    const [raza, setRaza] = useState('')
    const [sexo, setSexo] = useState('')
    const [color, setColor] = useState('')

    useEffect(() => {
        clearFields()
    }, [])


    const Save = () => {
        const pet = {
            nombre,
            fechaNacimiento: convertToTimestamp(new Date(fechaNacimiento)),
            especie,
            raza,
            sexo,
            color
        }
        console.log('new pet', pet);
        props.savefunction?.(pet)
        props.onHide()
        clearFields()
    }
    const clearFields = () => {
        setNombre('')
        setFechaNacimiento(toIsoString().substr(0, 16))
        setEspecie('')
        setRaza('')
        setSexo('')
        setColor('')
    }

    const toIsoString = (date = new Date()) => {
        var tzo = -date.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function (num) {
                var norm = Math.floor(Math.abs(num));
                return (norm < 10 ? '0' : '') + norm;
            };

        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            dif + pad(tzo / 60) +
            ':' + pad(tzo % 60);
    }

    return (
        <Modal
            show={props.show} onHide={() => {
                props.onHide()
                clearFields()
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton
                style={modalHeaderStyle}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Nueva Mascota
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Row>
                        <Col>
                            <FormGroup controlId='nombre'>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}>
                                </Form.Control>
                            </FormGroup>
                        </Col>
                        <Col>
                            <Form.Group controlId="fechaNacimiento">
                                <Form.Label>Fecha de Nacimiento</Form.Label>
                                <Form.Control type='datetime-local' value={fechaNacimiento}
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <FormGroup controlId='especie'>
                                <Form.Label>Especie</Form.Label>
                                <Form.Control value={especie}
                                    onChange={(e) => setEspecie(e.target.value)}>
                                </Form.Control>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup controlId='raza'>
                                <Form.Label>Raza</Form.Label>
                                <Form.Control value={raza}
                                    onChange={(e) => setRaza(e.target.value)}>
                                </Form.Control>
                            </FormGroup>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <FormGroup controlId='sexo'>
                                <Form.Label>Sexo</Form.Label>
                                <Form.Control value={sexo}
                                    onChange={(e) => setSexo(e.target.value)}>
                                </Form.Control>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup controlId='color'>
                                <Form.Label>Color</Form.Label>
                                <Form.Control value={color}
                                    onChange={(e) => setColor(e.target.value)}>
                                </Form.Control>
                            </FormGroup>
                        </Col>
                    </Form.Row>

                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={props.onHide}>
                    Cancelar
                </Button>
                <Button onClick={Save}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FormPet

const modalHeaderStyle = {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    color: 'white'
}
