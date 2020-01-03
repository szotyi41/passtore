import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Container, Button, Form, Modal, InputGroup, Alert, Breadcrumb } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons'
import { inject, obmachine } from 'mobx-react'

import Navbar from '../Navbar'

import PhysicalMachine from './PhysicalMachine'
import PhysicalMachineEdit from './PhysicalMachineEdit'
import PhysicalMachineRemove from './PhysicalMachineRemove'

const PhysicalMachineList = (props) => {

    const { machinesFiltered, searchText, loading, defaultServer } = props.machineStore
    const machineEditModal = useRef()
    const machineRemoveModal = useRef()

    useEffect(() => {
        props.machineStore.getServers();
    }, []);

    const openEditModal = (machine) => {
        props.machineStore.setServer(machine)
        props.machineStore.setOldServer(machine)
        machineEditModal.current.openEditModal()
    }

    const openRemoveModal = (machine) => {
        props.machineStore.setServer(machine)
        machineRemoveModal.current.openRemoveModal()
    }
    
    return (
        <Container className="mt-2">

            <Navbar />

            <Form>
                <Form.Group controlId="search">
                    <InputGroup>
                        <Form.Control type="search" placeholder="Enter search"  aria-describedby="search-icon" value={searchText} onChange={e => props.machineStore.setSearchText(e.target.value)} />
                        <InputGroup.Append>
                            <InputGroup.Text id="search-icon"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                        </InputGroup.Append>

                        <Button variant="primary" className="ml-2" onClick={e => openEditModal(defaultServer)}>Add machine</Button>
                    </InputGroup>
                </Form.Group>
            </Form>

            {machinesFiltered.length ? (
                machinesFiltered.map(machine => <Server machine={machine} key={machine._id} onEdit={e => openEditModal(machine)} onRemove={e => openRemoveModal(machine)}></Server>)
            ) : loading ? '' : (<Alert variant='warning'>No results for search {searchText}</Alert>)}

            <ServerEdit ref={machineEditModal} machineStore={props.machineStore}></ServerEdit>
            <ServerRemove ref={machineRemoveModal} machineStore={props.machineStore}></ServerRemove>
        </Container>
    )
    
}

export default inject('machineStore')(obmachine(PhysicalMachineList));