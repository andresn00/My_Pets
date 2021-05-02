import React, { useState } from 'react'
import { Table, Button } from 'react-bootstrap'

const PetsTable = ({ historial, tipo, onClick }) => {
    const tipoToString = () => {
        switch (tipo) {
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
            <Button className='my-4' variant='success' onClick={onClick}>
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
                    </tr>
                </thead>
                <tbody>
                    {historial?.slice(0).reverse().map((cita, index) => (cita.tipo === tipo ?
                        (
                            <tr key={index}>
                                <td>{cita.fecha.toDate().toLocaleDateString('en-GB') || 'n/a'}</td>
                                <td>{cita.fechaProxima?.toDate().toLocaleDateString('en-GB') || 'n/a'}</td>
                                <td>{cita.peso || 'n/a'}</td>
                                <td>{cita.descripcion || 'n/a'}</td>
                                <td>{cita.producto || 'n/a'}</td>
                                <td>{cita.dosis || 'n/a'}</td>
                            </tr>
                        ) : null
                    )
                    )}
                </tbody>
            </Table>
        </>
    )
}

export default PetsTable
