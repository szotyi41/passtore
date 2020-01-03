import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Button, Form, Modal, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { inject, observer } from 'mobx-react';
import toastr from 'toastr'

const ServiceRemove = forwardRef((props, ref) => {

    const [ showModal, setShowModal ] = useState(false)
    const [ service, setService ] = useState({_id: '', name: ''})

    // Call from ref
    useImperativeHandle(ref, () => ({
        openRemoveModal: service => { 
            setService(service)
            setShowModal(true)
        },
        closeRemoveModal: () => setShowModal(false)
    }))

    const close = () => setShowModal(false)
    const remove = () => {
        props.serverStore.removeService(service._id).then(() => {
            toastr.success('Service removed successfully')
        }).catch(error => {
            toastr.error('Failed to remove service')
        }).finally(() => {
            setShowModal(false)
        })
    }

    return (
        <div>
            <Modal size="sm" show={showModal} onHide={e => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove Service</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Do you want to remove {service.name}?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={e => close()}>Close</Button>
                    <Button variant="danger" onClick={e => remove()}>Remove</Button>
                </Modal.Footer>
            </Modal>

            <style jsx="true">{`

            `}</style>
        </div>
    )

})

export default inject('serverStore')(observer(ServiceRemove));
