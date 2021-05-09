import React from 'react'
import { Modal, Button } from 'react-bootstrap'
const ConfirmationModal = (props) => {
    const confirmFunction = () => {
        props.confirmfunction?.()
        props.onHide()
    }
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{props.header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Cancelar
          </Button>
                <Button variant={props.btnVariant} onClick={confirmFunction}>
                    {props.btnMessage}
          </Button>
            </Modal.Footer>
        </Modal>)
}

export default ConfirmationModal
