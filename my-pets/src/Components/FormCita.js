import React, { useState, useEffect } from 'react'
import {convertToTimestamp} from '../firestore'

import { Modal, Button, Form, Col, InputGroup } from 'react-bootstrap'
import { FaEraser } from "react-icons/fa";

const FormCita = (props) => {
    // const [cita, setCita] = useState({})
    const cita = props.cita
    const [fecha, setFecha] = useState(cita.fecha)
    const [fechaProxima, setFechaProxima] = useState(cita.fechaProxima)
    const [peso, setPeso] = useState(cita.peso)
    const [tipo, setTipo] = useState(props.tipocita)
    const [descripcion, setDescripcion] = useState(cita.descripcion)
    const [producto, setProducto] = useState(cita.producto)
    const [dosis, setDosis] = useState(cita.dosis)


    useEffect(() => {
        const setCitaValues = () => {
            const cita = props.cita
            setFecha(toIsoString(cita.fecha?.toDate()).substr(0, 16) || toIsoString().substr(0, 16))
            setFechaProxima(toIsoString(cita.fechaProxima?.toDate()).substr(0, 16) || '')
            setPeso(cita.peso || '')
            setDescripcion(cita.descripcion || '')
            setProducto(cita.producto || '')
            setDosis(cita.dosis || '')
        }
        setCitaValues()

    }, [props.cita, props.show])

    const Save = () => {
        const cita = {
            fecha: convertToTimestamp(new Date(fecha)),
            ...(fechaProxima && {fechaProxima: convertToTimestamp(new Date(fechaProxima))}),
            peso,
            tipo: parseInt(tipo),
            descripcion,
            producto,
            dosis
        }
        console.log('form cita', cita);
        props.savefunction(cita)
        props.onHide()
    }

    const toIsoString = (date = new Date()) => {
        var tzo = -date.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function(num) {
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
            show={props.show} onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton
                style={modalHeaderStyle}>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.type === 'add' ? 'Nueva' : 'Actualizar'} Cita
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="fecha">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type='datetime-local' value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="fecha">
                                <Form.Label>Fecha próxima cita</Form.Label>
                                <InputGroup>
                                    <Form.Control type='datetime-local' value={fechaProxima}
                                        onChange={(e) => setFechaProxima(e.target.value)}
                                    />
                                    <InputGroup.Append className='align-self-center ml-2'>
                                        <FaEraser className='cursorPointer' onClick={() => setFechaProxima('')} />
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col lg={4} xs={6}>
                            <Form.Group controlId="peso">
                                <Form.Label>Peso</Form.Label>
                                <Form.Control value={cita.peso}
                                    onChange={(e) => setPeso(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col lg={4} xs={6}>
                            <Form.Group controlId="tipo">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control as='select' value={tipo}
                                    onChange={(e) => {
                                        console.log('antes', tipo)
                                        setTipo(e.target.value)
                                        console.log('despues', tipo)
                                    }}>
                                    <option value={1}>Desparacitacion</option>
                                    <option value={2}>Vacuna</option>
                                    <option value={3}>Otro</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group controlId="descripcion">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control as='textarea' value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col xs={12} lg={9}>
                            <Form.Group controlId="producto">
                                <Form.Label>Producto</Form.Label>
                                <Form.Control value={producto}
                                    onChange={(e) => setProducto(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={3} xs={6}>
                            <Form.Group controlId="dosis">
                                <Form.Label>Dosis</Form.Label>
                                <Form.Control value={dosis}
                                    onChange={(e) => setDosis(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={props.onHide}>Cancelar</Button>
                <Button onClick={Save}>
                    {props.type === 'add' ? 'Agregar' : 'Actualizar'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FormCita

const modalHeaderStyle = {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    color: 'white'
}
