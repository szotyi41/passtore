import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Container, Button, Form, Modal, InputGroup, Alert, Breadcrumb } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons'
import { inject, observer } from 'mobx-react'

import Navbar from '../Navbar'

import Server from './Server'
import ServerEdit from './ServerEdit'
import ServerRemove from './ServerRemove'

const ServerList = (props) => {

    const { serversFiltered, searchText, loading, defaultServer } = props.serverStore
    const serverEditModal = useRef()
    const serverRemoveModal = useRef()

    useEffect(() => {
        props.serverStore.getServers();
    }, []);

    const openEditModal = (server) => {
        props.serverStore.setServer(server)
        props.serverStore.setOldServer(server)
        serverEditModal.current.openEditModal()
    }

    const openRemoveModal = (server) => {
        props.serverStore.setServer(server)
        serverRemoveModal.current.openRemoveModal()
    }
    
    return (
        <Container className="mt-2">

            <Navbar />

            <Form>
                <Form.Group controlId="search">
                    <InputGroup>
                        <Form.Control type="search" placeholder="Enter search"  aria-describedby="search-icon" value={searchText} onChange={e => props.serverStore.setSearchText(e.target.value)} />
                        <InputGroup.Append>
                            <InputGroup.Text id="search-icon"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                        </InputGroup.Append>

                        <Button variant="primary" className="ml-2" onClick={e => openEditModal(defaultServer)}>Add server</Button>
                    </InputGroup>
                </Form.Group>
            </Form>

            {serversFiltered.length ? (
                serversFiltered.map(server => <Server server={server} key={server._id} onEdit={e => openEditModal(server)} onRemove={e => openRemoveModal(server)}></Server>)
            ) : loading ? '' : (<Alert variant='warning'>No results for search {searchText}</Alert>)}

            <ServerEdit ref={serverEditModal} serverStore={props.serverStore}></ServerEdit>
            <ServerRemove ref={serverRemoveModal} serverStore={props.serverStore}></ServerRemove>
        </Container>
    )
    
}

export default inject('authStore')(inject('serverStore')(observer(ServerList)));