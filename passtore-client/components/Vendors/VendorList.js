import React, { useState, useEffect, useRef } from 'react'
import { Container, Button, Form, InputGroup, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons'
import { inject, observer } from 'mobx-react'

import Navbar from '../Navbar'

import Vendor from './Vendor'
import VendorEdit from './VendorEdit'
import VendorRemove from './VendorRemove'

const VendorList = (props) => {

    const { vendorsFiltered, searchText, loading, defaultVendor } = props.vendorStore
    const vendorEditModal = useRef()
    const vendorRemoveModal = useRef()

    useEffect(() => {
        props.vendorStore.getVendors();
    }, []);

    const openEditModal = (vendor) => {
        props.vendorStore.setVendor(vendor)
        props.vendorStore.setOldVendor(vendor)
        vendorEditModal.current.openEditModal()
    }

    const openRemoveModal = (vendor) => {
        props.vendorStore.setVendor(vendor)
        vendorRemoveModal.current.openRemoveModal()
    }
    
    return (
        <div>

            <Navbar authStore={props.authStore} />

            <Container className="mt-2">
                <Form>
                    <Form.Group controlId="search">
                        <InputGroup>
                            <Form.Control type="search" placeholder="Enter search"  aria-describedby="search-icon" value={searchText} onChange={e => props.vendorStore.setSearchText(e.target.value)} />
                            <InputGroup.Append>
                                <InputGroup.Text id="search-icon"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                            </InputGroup.Append>

                            <Button variant="primary" className="ml-2" onClick={e => openEditModal(defaultVendor)}>Add vendor</Button>
                        </InputGroup>
                    </Form.Group>
                </Form>

                {vendorsFiltered.length ? (
                    vendorsFiltered.map(vendor => <Vendor vendor={vendor} key={vendor._id} onEdit={e => openEditModal(vendor)} onRemove={e => openRemoveModal(vendor)}></Vendor>)
                ) : loading ? '' : (<Alert variant='warning'>No results for search {searchText}</Alert>)}

                <VendorEdit ref={vendorEditModal} vendorStore={props.vendorStore}></VendorEdit>
                <VendorRemove ref={vendorRemoveModal} vendorStore={props.vendorStore}></VendorRemove>
            </Container>
        </div>
    )
    
}

export default inject('authStore')(inject('vendorStore')(observer(VendorList)));