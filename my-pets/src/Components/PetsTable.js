import React, { useState, useEffect } from 'react'
import { Table, Button, Alert } from 'react-bootstrap'
import { FaTimes, FaPen, FaPencilRuler } from "react-icons/fa";

import FormCita from './FormCita'
import { updatePetCitasPendientes } from '../pets'
import { getCitasWherePet, addCita, updateCita, deleteCita } from '../citas'
import ConfirmationModal from './ConfirmationModal';

const PetsTable = ({ petId, tipocita }) => {
    const [citas, setCitas] = useState([])
    const [citasPendientes, setCitasPendientes] = useState([])
    const [citasCompletadas, setCitasCompletadas] = useState([])
    const [citaToUpdate, setCitaToUpdate] = useState({})
    const [citaToDelete, setCitaToDelete] = useState({})
    const [confirmationModalShow, setConfirmationModalShow] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [modalType, setModalType] = useState('add')
    useEffect(() => {
        const getCitas = async () => {
            const citas = await getCitasWherePet(petId)
            setCitas(citas)
            SplitCitas(citas)
        }
        getCitas()

    }, [])

    useEffect(() => {
        const updateCitasPendientes = () => {
            //Agrega el numero de citas pendientes a la mascota
            updatePetCitasPendientes(petId, citasPendientes.length)
            console.log('updatePendientes', citasPendientes.length)
        }
        updateCitasPendientes()
    }, [citasPendientes?.length])

    const SplitCitas = (citas) => {
        const pendientes = []
        const completadas = []
        citas.map((c) => {
            if (c.estado === 1) {
                completadas.push(c)
            }
            else if (c.estado === 2) {
                pendientes.push(c)
            }
        })
        setCitasCompletadas(completadas)
        setCitasPendientes(pendientes)
        console.log('cc', completadas, citasCompletadas);
        console.log('cp', pendientes, citasPendientes);
    }

    const AddCita = (cita, agendarProxCita = false) => {
        cita.pet = petId
        console.log('addCita', cita)
        addCita(cita)
        setCitas([...citas, cita])
        if (cita.estado === 1) {
            setCitasCompletadas([...citasCompletadas, cita])
        }
        else if (cita.estado === 2) {
            setCitasPendientes([...citasPendientes, cita])
        }

        if (agendarProxCita) {
            console.log('Se agenda proxima cita')
            AddProxCita(cita)
        }

    }
    const UpdateCita = (cita, agendarProxCita = false) => {
        const id = citaToUpdate.id
        console.log('updateCita', id, cita)
        updateCita(id, cita)
        const citasUpdated = [...citas.filter((c) => c.id !== id), { ...cita, id: citaToUpdate.id }]
        setCitas(citasUpdated)
        SplitCitas(citasUpdated)
        console.log('agendarProxCita', agendarProxCita);
        if (agendarProxCita) {
            console.log('Se agenda proxima cita')
            AddProxCita(cita)
        }

    }
    const DeleteCita = () => {
        const id = citaToDelete.id
        console.log('deleteCita', citaToDelete)
        deleteCita(id)
        setCitas([...citas.filter((c) => c.id !== id)])
    }

    const AddProxCita = (citaActual) => {
        const citaProx = {
            pet: petId,
            tipo: citaActual.tipo,
            estado: 2,
            fecha: citaActual.fechaProxima
        }
        addCita(citaProx)
        setCitas([...citas, citaProx])
        setCitasPendientes([...citasPendientes, citaProx])
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


            <Alert variant='warning' className='mb-4'>
                <h3>Citas Pendientes</h3>
            </Alert>
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
                    {citasPendientes?.slice(0).reverse().map((cita, index) => (cita.tipo === tipocita ?
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

            <Alert variant='success' className='mt-5'>
                <h3>Citas Completadas</h3>
            </Alert>
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
                    {citasCompletadas?.slice(0).reverse().map((cita, index) => (cita.tipo === tipocita ?
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
                savefunction={(cita, agendarProxCita) => {
                    modalType === 'add' ? AddCita(cita, agendarProxCita) : UpdateCita(cita, agendarProxCita)
                }}
            />
            <ConfirmationModal show={confirmationModalShow}
                onHide={() => setConfirmationModalShow(false)}
                confirmfunction={() => DeleteCita()}
                btnVariant='danger' btnMessage='Eliminar'
                header='Eliminar Cita' body='¿Está seguro que desea eliminar la cita? 
                Esta acción no puede ser revertida.'
            />

        </>
    )
}

export default PetsTable
