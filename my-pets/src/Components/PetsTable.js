import React from 'react'
import {Table} from 'react-bootstrap'
const PetsTable = ({ historial, tipo }) => {
    console.log('Historial en PetsTable', historial)
    
    return (
        <Table bordered hover striped responsive size='sm'>
        <thead>
            <tr>
                <th>Fecha</th>
                <th>Fecha proxima</th>
                <th>Peso</th>
                <th>Tipo</th>
                <th>Descripcion</th>
                <th>Producto</th>
                <th>Dosis</th>
            </tr>
        </thead>
        <tbody>
            {historial?.map((cita, index) => (cita.tipo === tipo ?
                (
                    <tr key={index}>
                        <td>{new Date(cita.fecha.toMillis()).toLocaleDateString('en-GB') || 'n/a'}</td>
                        <td>{new Date(cita.fechaProxima?.toMillis()).toLocaleDateString('en-GB') || 'n/a'}</td>
                        <td>{cita.peso || 'n/a'}</td>
                        <td>{cita.tipo || 'n/a'}</td>
                        <td>{cita.descripcion || 'n/a'}</td>
                        <td>{cita.producto || 'n/a'}</td>
                        <td>{cita.dosis || 'n/a'}</td>
                    </tr>
                ) : null
            )
            )}
        </tbody>
    </Table>
)
}

export default PetsTable
