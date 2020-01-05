import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react'
import ReactDirective from 'react-directive'
import { Button, ButtonGroup, Form, Modal, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faLock } from '@fortawesome/free-solid-svg-icons'
import { inject, observer, toJS } from 'mobx-react'
import { TwitterPicker } from 'react-color'
import toastr from 'toastr'
import $ from 'jquery'


const UserEdit = forwardRef((props, ref) => {

    const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const user = props.userStore.user
    const { name, email, role, password, password_again } = user

    const [ showModal, setShowModal ] = useState(false)
    const [ invalidName, setInvalidName ] = useState(false)
    const [ invalidEmail, setInvalidEmail ] = useState(false)
    const [ invalidRole, setInvalidRole ] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)
    const [ invalidPassword, setInvalidPassword ] = useState(false)

    const roles = ['admin', 'designer', 'developer', 'junior']

    // Call from ref
    useImperativeHandle(ref, () => ({
        openEditModal: () => setShowModal(true),
        closeEditModal: () => setShowModal(false)
    }))

    const setUser = (field, value) => props.userStore.setUserField(user, field, value)

    // Close user edit modal
    const close = () => {
        props.userStore.setUser(props.userStore.olduser)
        setShowModal(false)
    }

    const save = () => {

        // Validation
        let err = false

        // Name
        if (!name || !name.trim()) {
            setInvalidName(true)
            err = true
        }

        // Email
        if (!email || !email_regex.test(email)) {
            setInvalidEmail(true)
            err = true
        }

        // Role is empty
        if (!role) {
            setInvalidRole(true)
            err = true
        }

        // Password
        if (password !== password_again) {
            setInvalidPassword(true)
            err = true
        }

        if (!err) props.userStore.saveUser().then(() => {
            toastr.success('User saved successfully')
            setShowModal(false)
        }).catch(error => {
            toastr.error('Failed to save user')
        })
    }

    return (
        <ReactDirective>
            <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        {/* Name */}
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <label htmlFor="user-name" className="w-25">Name</label>
                            <InputGroup className="position-relative"> 
                                <Form.Control type="text" 
                                    placeholder="Name" 
                                    id="user-name" 
                                    value={name} 
                                    onChange={e => { setUser('name', e.target.value); setInvalidName(false) }}
                                    className={invalidName ? 'is-invalid' : ' '}
                                />
                            </InputGroup>
                        </Form.Group>

                        {/* E-mail */}
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <label htmlFor="user-email" className="w-25">E-mail</label>
                            <InputGroup>
                                <Form.Control type="text" 
                                    placeholder="E-mail" 
                                    id="user-email" 
                                    value={email} 
                                    onChange={e => { setUser('email', e.target.value); setInvalidEmail(false) }} 
                                    className={invalidEmail ? 'is-invalid' : ''}
                                />
                            </InputGroup>
                        </Form.Group>

                        {/* Role */}
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <label htmlFor="user-role" className="w-25">Role</label>
                            <InputGroup>
                                <Form.Control as="select" 
                                    placeholder="Role" 
                                    id="user-role" 
                                    value={role} 
                                    onChange={e => {setUser('role', e.target.value); setInvalidRole(false) }} 
                                    className={invalidRole ? 'is-invalid' : ''}>
                                    <option value="">-- Select user role --</option>
                                    {roles.map((role, index) => <option key={index} value={role}>{role}</option>)}
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>

                        {/* Password */}
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <label htmlFor="user-password" className="w-25">Password</label>
                            <InputGroup>
                                <Form.Control 
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder="Password"
                                    id="user-password"
                                    value={password} 
                                    onChange={e => {setUser('password', e.target.value); setInvalidPassword(false) }}
                                    className={invalidPassword ? 'is-invalid' : ''}
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-primary" onClick={() => setShowPassword(!showPassword)}><FontAwesomeIcon icon={faLock} /></Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        {/* Password again */}
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <label htmlFor="user-password-again" className="w-25">Password again</label>
                            <InputGroup>
                                <Form.Control 
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder="Password again"
                                    id="user-password-again"
                                    value={password_again} 
                                    onChange={e => {setUser('password_again', e.target.value); setInvalidPassword(false) }} 
                                    className={invalidPassword ? 'is-invalid' : ''}
                                />
                            </InputGroup>
                        </Form.Group>


                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={e => close()}>Close</Button>
                    <Button variant="primary" onClick={e => save()}>Save changes</Button>
                </Modal.Footer>
            </Modal>

            <style jsx="true">{`

            `}</style>
        </ReactDirective>
    )

})

export default inject('userStore')(observer(UserEdit));
