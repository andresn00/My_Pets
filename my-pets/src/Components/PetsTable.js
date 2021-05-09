import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { FaTimes, FaPen, FaPencilRuler } from "react-icons/fa";

import FormCita from './FormCita'
import { getCitasWherePet, addCita, updateCita, deleteCita } from '../citas'
import ConfirmationModal from './ConfirmationModal';

const PetsTable = ({ petId, tipocita }) => {
    const [citas, setCitas] = useState([])
    const [citaToUpdate, setCitaToUpdate] = useState({})
    const [citaToDelete, setCitaToDelete] = useState({})
    const [confirmationModalShow, setConfirmationModalShow] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [modalType, setModalType] = useState('add')
    useEffect(() => {
        const getCitas = async () => {
            const citas = await getCitasWherePet(petId)
            setCitas(citas)
        }
        getCitas()

    }, [])

    const AddCita = (cita) => {
        cita.pet = petId
        console.log('addCita', cita)
        addCita(cita)
        setCitas([...citas, cita])
    }
    const UpdateCita = (cita) => {
        const id = citaToUpdate.id
        console.log('updateCita', id, cita)
        updateCita(id, cita)
        setCitas([...citas.filter((c) => c.id !== id), { ...cita, id: citaToUpdate.id }])
    }
    const DeleteCita = () => {
        const id = citaToDelete.id
        console.log('deleteCita', citaToDelete)
        deleteCita(id)
        setCitas([...citas.filter((c) => c.id !== id)])
    }

    const tipoToString = () => {
        switch (tipocita) {
            case 1:
                return 'Desparacitación'
            case 2:
                return 'Vacuna'
            case 3:
                return 'Cita'
        }
    }
    return (
        <>
            <Button className='my-4' variant='success'
                onClick={() => {
                    setModalShow(true)
                    setModalType('add')
                    setCitaToUpdate({})
                }}
            >
                Nueva {tipoToString()}
            </Button>

            <Table bordered hover striped responsive size='sm'>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Fecha próxima</th>
                        <th>Peso</th>
                        <th>Descripción</th>
                        <th>Producto</th>
                        <th>Dosis</th>
                        <th className='text-center'><FaPencilRuler /></th>
                    </tr>
                </thead>
                <tbody>
                    {citas?.slice(0).reverse().map((cita, index) => (cita.tipo === tipocita ?
                        (
                            <tr key={index}>
                                <td>{cita.fecha?.toDate().toLocaleDateString('en-GB') || 'n/a'}</td>
                                <td>{cita.fechaProxima?.toDate().toLocaleDateString('en-GB') || 'n/a'}</td>
                                <td>{cita.peso || 'n/a'}</td>
                                <td>{cita.descripcion || 'n/a'}</td>
                                <td>{cita.producto || 'n/a'}</td>
                                <td>{cita.dosis || 'n/a'}</td>
                                <td className='text-center'>
                                    <FaPen onClick={() => {
                                        setModalShow(true)
                                        setModalType('update')
                                        setCitaToUpdate(cita)
                                    }}
                                        className='cursorPointer'
                                    />
                                    {' '}
                                    <FaTimes onClick={() => {
                                        setConfirmationModalShow(true)
                                        setCitaToDelete(cita)
                                    }}
                                        className='cursorPointer'
                                    />
                                </td>
                            </tr>
                        ) : null
                    )
                    )}
                </tbody>
            </Table>
            <FormCita type={modalType}
                tipocita={tipocita} cita={citaToUpdate}
                show={modalShow}
                onHide={() => setModalShow(false)}
                savefunction={(cita) => {
                    modalType === 'add' ? AddCita(cita) : UpdateCita(cita)
                }}
            />
            <ConfirmationModal show={confirmationModalShow}
                onHide={() => setConfirmationModalShow(false)}
                confirmfunction={() => DeleteCita()}
                btnVariant='danger' btnMessage='Eliminar'
                header='Eliminar Cita' body={`¿Está seguro que desea eliminar la cita? 
                Esta acción no puede ser revertida.`}
            />

        </>
    )
}

export default PetsTable
