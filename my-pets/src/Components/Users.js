import React, { useState, useEffect, useContext } from 'react'
import { getUsers, getUsersWhereVet } from '../users'
import { UserContext } from '../Providers/UserProvider'

import { Link } from 'react-router-dom'
import {
    Container, Col, Row, Button, InputGroup,
    FormControl, Breadcrumb
} from 'react-bootstrap'

import {updateUser, getUserById} from '../users'

const Users = () => {
    const { user } = useContext(UserContext)
    const [idUserToAdd, setIdUserToAdd] = useState('')
    const [usersInVet, setUsersInVet] = useState([])
    const [usersAreVets, setUsersAreVets] = useState(false)

    useEffect(() => {
        const getUsers = async () => {
            const users = await getUsersWhereVet(user.vet)
            setUsersInVet(users)
        }
        getUsers()

    }, [])

    const addUserToVet = async () => {
        const usr = await getUserById(idUserToAdd)
        if (!usr) {
            console.log('No existe el usuario')
            return
        }
        const userData = {
            vet: user.vet,
            isVet: usersAreVets
        }
        updateUser(idUserToAdd, userData)
        const updatedUser = { ...usr, ...userData }
        console.log(updatedUser)
        setUsersInVet([...usersInVet.filter((u) => u.id !== idUserToAdd), updatedUser])
        setIdUserToAdd('')
    }

    return (
        <>
            <div className='m-2 p-2'>
                <h2>Usuarios</h2><hr></hr>
                <Container className='mx-0'>
                    <Row>
                        <Col xs={12} md={8}>
                            <InputGroup>
                                <FormControl value={idUserToAdd}
                                    onChange={(e) => setIdUserToAdd(e.target.value)}
                                    placeholder={`Agregar ${usersAreVets ? 'doctor':'cliente'} a la veterinaria`} />
                                <InputGroup.Append>
                                    <Button variant='success' onClick={addUserToVet}>
                                        Agregar
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col>
                            <Button>Crear nuevo usuario</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='m-4 p-2'>
                <Breadcrumb style={{width:'fit-content'}}>
                    <Breadcrumb.Item active={!usersAreVets ? true:false}
                        onClick={() => setUsersAreVets(false)}>
                        Clientes
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active={usersAreVets ? true:false}
                        onClick={() => setUsersAreVets(true)}>
                        Doctores
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Container className='mx-0 rounded' style={{ backgroundColor: '#efefef' }}>
                    <Row className='py-2 border-bottom border-secondary font-weight-bold'>
                        <Col>Nombre</Col>
                        <Col>IsVet</Col>
                        <Col>Id Usuario</Col>
                    </Row>

                    {usersInVet.map((user) => ( usersAreVets === user.isVet ?
                          (
                            <Link to={`/carnets/${user.id}`} key={user.id}
                                className='linkInUsersContainer'
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <Row className='py-2'>
                                    <Col>
                                        {user.nombre}
                                    </Col>
                                    <Col>
                                        {user.isVet.toString()}
                                    </Col>
                                    <Col>
                                        {user.id}
                                    </Col>
                                </Row>
                            </Link>
                        ) : null
                    )
                    )}
                </Container>
            </div>
        </>
    )
}

export default Users
