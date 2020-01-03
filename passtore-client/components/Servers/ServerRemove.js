import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Button, Form, Modal, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { inject, observer } from 'mobx-react';
import toastr from 'toastr'

const ServerRemove = forwardRef((props, ref) => {

    const ip_regex = /^(([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])(\.(?!$)|(?=$))){4}$/
    const { name } = props.serverStore.server
    const [ showModal, setShowModal ] = useState(false)

    // Call from ref
    useImperativeHandle(ref, () => ({
        openRemoveModal: () => setShowModal(true),
        closeRemoveModal: () => setShowModal(false)
    }))

    const close = () => setShowModal(false)
    const remove = () => {
        props.serverStore.removeServer().then(() => {
            toastr.success('Server removed successfully')
        }).catch(error => {
            toastr.error('Failed to remove server')
        }).finally(() => {
            setShowModal(false)
        })
    }

    return (
        <div>
            <Modal size="sm" show={showModal} onHide={e => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove Server</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Do you want to remove {name}?
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

export default inject('serverStore')(observer(ServerRemove));
