import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Button, Form, Modal, InputGroup } from 'react-bootstrap'
import { inject, observer } from 'mobx-react'
import toastr from 'toastr'

const UserRemove = forwardRef((props, ref) => {

    const { name } = props.userStore.user
    const [ showModal, setShowModal ] = useState(false)

    // Call from ref
    useImperativeHandle(ref, () => ({
        openRemoveModal: () => setShowModal(true),
        closeRemoveModal: () => setShowModal(false)
    }))

    const close = () => setShowModal(false)
    const remove = () => {
        props.userStore.removeUser().then(() => {
            toastr.success('User removed successfully')
        }).catch(error => {
            toastr.error('Failed to remove user')
        }).finally(() => {
            setShowModal(false)
        })
    }

    return (
        <div>
            <Modal size="sm" show={showModal} onHide={e => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove User</Modal.Title>
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

export default inject('userStore')(observer(UserRemove));
