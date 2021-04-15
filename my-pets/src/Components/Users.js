import React, { useState, useEffect, useContext } from 'react'
import { getUsersWhereVet} from '../users'
import { UserContext } from '../Providers/UserProvider'

import { Container, Button, InputGroup, FormControl, Col, Row } from 'react-bootstrap'

const Users = () => {
    const { user, userLoaded } = useContext(UserContext)
    const [idUserToAdd, setIdUserToAdd] = useState('')
    const [usersInVet, setUsersInVet] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const users = await getUsersWhereVet(user.vet)
            setUsersInVet(users)
            // const newUser = {}
            // setNormalUsers([...normalUsers, newUser])
        }
        getUsers()

    }, [])
    // console.log(normalUsers[0])
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
                <Container className='mx-0 rounded' style={{ backgroundColor: '#efefef' }}>
                    {usersInVet.map((user) => (
                        <Row key={user.id}>
                            <Col>
                                {user.nombre}
                            </Col>
                            <Col>
                                {user.vet}
                            </Col>
                        </Row>
                    ))}
                </Container>
            </div>
        </>
    )
}

export default Users
