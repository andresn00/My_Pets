import React, { useState, useEffect, useContext } from 'react'
import { getUsersWhereVet } from '../users'
import { UserContext } from '../Providers/UserProvider'

import { Link } from 'react-router-dom'
import { Container, Col, Row, Button, InputGroup, FormControl, Breadcrumb } from 'react-bootstrap'

const Users = () => {
    const { user } = useContext(UserContext)
    const [idUserToAdd, setIdUserToAdd] = useState('')
    const [usersInVet, setUsersInVet] = useState([])
    const [usersAreVets, setUsersAreVets] = useState(false)

    var usersDoctors = []
    var usersClients = []
    useEffect(() => {
        const getUsers = async () => {
            const users = await getUsersWhereVet(user.vet)
            setUsersInVet(users)
        }
        getUsers()

    }, [])

    const checkDoctors = (u) => {
        if (u.isVet) {
            return u
        }
    }
    const checkClients = (u) => {
        if (!u.isVet) {
            return u
        }
    }
    return (
        <>
            <div className='m-2 p-2'>
                <h2>Usuarios</h2><hr></hr>
                <Container className='mx-0'>
                    <Row>
                        <Col xs={12} md={8}>
                            <InputGroup>
                                <FormControl
                                    onChange={(e) => setIdUserToAdd(e.target.value)}
                                    placeholder='Agregar usuario por id' />
                                <InputGroup.Append>
                                    <Button variant='success'>
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
