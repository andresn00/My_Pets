import React from 'react'

import { Modal, Button, Form, Col } from 'react-bootstrap'

const FormCita = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton
                style={{ backgroundColor: '#007bff', borderColor: '#007bff', color:'white' }}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Nueva Cita
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="fecha">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type='date' />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="fecha">
                                <Form.Label>Fecha próxima cita</Form.Label>
                                <Form.Control type='date' />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col lg={4} xs={6}>
                            <Form.Group controlId="peso">
                                <Form.Label>Peso</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col lg={4} xs={6}>
                            <Form.Group controlId="tipo">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control as='select' value={props.tipo}
                                    onChange={() => { }}>
                                    <option value={1}>Desparacitacion</option>
                                    <option value={2}>Vacuna</option>
                                    <option value={3}>Otro</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group controlId="descripcion">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control as='textarea' />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col xs={12} lg={9}>
                            <Form.Group controlId="producto">
                                <Form.Label>Producto</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Col>
                        <Col lg={3} xs={6}>
                            <Form.Group controlId="dosis">
                                <Form.Label>Dosis</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={props.onHide}>Cancelar</Button>
                <Button onClick={props.onHide}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FormCita
