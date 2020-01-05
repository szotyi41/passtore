import React, { useState, useEffect, useRef } from 'react'
import ReactDirective from 'react-directive'
import { Container, Button, Form, InputGroup, Alert, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons'
import { inject, observer } from 'mobx-react'

import Navbar from '../Navbar'

import User from './User'
import UserEdit from './UserEdit'
import UserRemove from './UserRemove'

const UserList = (props) => {

    const { usersFiltered, searchText, loading, defaultUser } = props.userStore
    const userEditModal = useRef()
    const userRemoveModal = useRef()

    useEffect(() => {
        props.userStore.getUsers();
    }, []);

    const openEditModal = (user) => {
        props.userStore.setUser(user)
        props.userStore.setOldUser(user)
        userEditModal.current.openEditModal()
    }

    const openRemoveModal = (user) => {
        props.userStore.setUser(user)
        userRemoveModal.current.openRemoveModal()
    }
    
    return (
        <ReactDirective>

            <Navbar authStore={props.authStore} />

            <Container className="mt-2">
                <Form>
                    <Form.Group controlId="search">
                        <InputGroup>
                            <Form.Control type="search" placeholder="Enter search"  aria-describedby="search-icon" value={searchText} onChange={e => props.userStore.setSearchText(e.target.value)} />
                            <InputGroup.Append>
                                <InputGroup.Text id="search-icon"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                            </InputGroup.Append>

                            <Button variant="primary" className="ml-2" onClick={e => openEditModal(defaultUser)}>Invite user</Button>
                        </InputGroup>
                    </Form.Group>
                </Form>

                <Table striped hover variant="dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Role</th>
                            <th>Registered</th>
                            <th></th>
                        </tr>
                    </thead>

                    {usersFiltered.length ? (
                        usersFiltered.map(user => <User user={user} key={user._id} onEdit={e => openEditModal(user)} onRemove={e => openRemoveModal(user)}></User>)
                    ) : ''}
                </Table>

                <Alert data-react-if={!usersFiltered.length && !loading} variant='warning'>No results for search {searchText}</Alert>

                <UserEdit ref={userEditModal} userStore={props.userStore}></UserEdit>
                <UserRemove ref={userRemoveModal} userStore={props.userStore}></UserRemove>
            </Container>
        </ReactDirective>
    )
    
}

export default inject('authStore')(inject('userStore')(observer(UserList)));