import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react'
import ReactDirective from 'react-directive'
import { Button, ButtonGroup, Form, Modal, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons'
import { inject, observer, toJS } from 'mobx-react'
import { TwitterPicker } from 'react-color'
import toastr from 'toastr'
import $ from 'jquery'

import Service from '../Services/Service.js'
import ServiceRemove from '../Services/ServiceRemove.js'
import Domains from '../Domains/Domains.js'

const ServerEdit = forwardRef((props, ref) => {

    const ip_regex = /^(([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])(\.(?!$)|(?=$))){4}$/
    const server = props.serverStore.server
    const { name, color, local_ip, global_ip, services, comment } = server
    const { user } = props.authStore

    const [ showModal, setShowModal ] = useState(false)
    const [ invalidName, setInvalidName ] = useState(false)
    const [ invalidLocalIp, setInvalidLocalIp ] = useState(false)
    const [ invalidGlobalIp, setInvalidGlobalIp ] = useState(false)

    // Define remove modal
    const serviceRemoveModal = useRef()

    // Call from ref
    useImperativeHandle(ref, () => ({
        openEditModal: () => setShowModal(true),
        closeEditModal: () => setShowModal(false)
    }))

    // Fade out colorpicker
    useEffect(() => {
        $(document).on('click', function(e) {
            const colorPicker = $('.color-picker')[0]
            if ($.contains(e.target, colorPicker)) {
                $('.color-picker').fadeOut()
            }
        })
    }, []) 

    const setServer = (field, value) => props.serverStore.setServerField(server, field, value)
    const addService = () => props.serverStore.addService()

    // Close server edit modal
    const close = () => {
        props.serverStore.setServer(props.serverStore.oldserver)
        setShowModal(false)
    }

    const save = () => {

        // Validation
        let err = false;

        // Name
        if (!name || !name.trim()) {
            setInvalidName(true)
            err = true
        }

        // Local IP
        if (!local_ip || !ip_regex.test(local_ip)) {
            setInvalidLocalIp(true)
            err = true
        }

        // Global IP
        if (!global_ip || !ip_regex.test(global_ip)) {
            setInvalidGlobalIp(true)
            err = true
        }

        if (!err) props.serverStore.saveServer().then(() => {
            toastr.success('Server saved successfully')
            setShowModal(false)
        }).catch(error => {
            toastr.error('Failed to save server')
        })
    }

    const setClipboard = (field) => {
        toastr.success('Copied successfully')
        navigator.clipboard.writeText(field)
    }

    const openService = (service) => {
        $('.service:not(#' + service._id + '), .domains').slideUp()
        $('#' + service._id).slideToggle()
    }

    const openDomains = () => {
        $('.service').slideUp()
        $('.domains').slideToggle()
    }

    // Open remove service modal
    const openRemoveServiceModal = (e, service) => {
        e.preventDefault()
        serviceRemoveModal.current.openRemoveModal(service)
    }

    return (
        <ReactDirective>
            <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Server</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        {/* Name */}
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <label htmlFor="server-name" className="w-25">Name</label>
                            <InputGroup className="position-relative"> 
                                <Form.Control type="text" 
                                    placeholder="Name" 
                                    id="server-name" 
                                    value={name} 
                                    onChange={e => { setServer('name', e.target.value); setInvalidName(false) }}
                                    className={invalidName ? 'is-invalid' : ' '}
                                />
                                <InputGroup.Append>
                                    <div className="color-picker">
                                        <TwitterPicker style={{display: 'none'}} onChangeComplete={color => setServer('color', color.hex)} />
                                    </div>
                                    <Button variant="outline-primary" style={{backgroundColor: color, border: 'none', width: '40px'}} onClick={e => $('.color-picker').fadeToggle()}> </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        {/* Local IP */}
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <label htmlFor="server-local_ip" className="w-25">Local IP</label>
                            <InputGroup>
                                <Form.Control type="text" 
                                    placeholder="Local IP" 
                                    id="server-local_ip" 
                                    value={local_ip} 
                                    onChange={e => { setServer('local_ip', e.target.value); setInvalidLocalIp(false) }} 
                                    className={invalidLocalIp ? 'is-invalid' : ''}
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-primary" onClick={e => setClipboard(local_ip)}><FontAwesomeIcon icon={faCopy} /></Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        {/* Global IP */}
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <label htmlFor="server-global_ip" className="w-25">Global IP</label>
                            <InputGroup className="has-error">
                                <Form.Control type="text" 
                                    placeholder="Global IP" 
                                    id="server-global_ip" 
                                    value={global_ip} 
                                    onChange={e => { setServer('global_ip', e.target.value); setInvalidGlobalIp(false) }}
                                    className={invalidGlobalIp ? 'is-invalid' : ''}
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-primary" onClick={e => setClipboard(global_ip)}><FontAwesomeIcon icon={faCopy} /></Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        {/* Comment */}
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <label htmlFor="server-comment" className="w-25">Comment</label>
                            <InputGroup>
                                <Form.Control as="textarea" 
                                    rows="3"
                                    id="server-comment"
                                    placeholder="Comment" 
                                    value={comment} 
                                    onChange={e => setServer('comment', e.target.value)} 
                                />
                            </InputGroup>
                        </Form.Group>

                        {/* Services */}
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <ButtonGroup size="sm" className="mt-3">
                                <Button onClick={e => openDomains()}>Domains</Button>
                                {services.map((service, index) => {
                                    return (
                                        <Button key={index} onClick={e => openService(service)}>{service.name}
                                            <FontAwesomeIcon className="button-remove-service" onClick={e => openRemoveServiceModal(e, service)} icon={faTrash} />
                                        </Button>
                                    )
                                })}
                                <Button onClick={e => addService()}>+</Button>
                            </ButtonGroup>
                        </Form.Group>

                        {/* Domains */}
                        <Domains serverStore={props.serverStore}></Domains>

                        {/* Edit services */}
                        {services.map((service, index) => <Service key={index} serverStore={props.serverStore} service={service}></Service>)}

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={e => close()}>Close</Button>
                    <Button variant="primary" onClick={e => save()}>Save changes</Button>
                </Modal.Footer>
            </Modal>
            
            {/* Service remove modal */}
            <ServiceRemove ref={serviceRemoveModal} serverStore={props.serverStore}></ServiceRemove>

            <style jsx="true">{`
                .color-picker {
                    display: none;
                    position: absolute; 
                    top: 48px;
                    z-index: 1000
                }

                .color-picked {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 16px;
                    border-radius: 50%;
                    width: 16px;
                    height: 16px;
                }

                .button-remove-service {
                    margin-left: 16px;
                }
            `}</style>
        </ReactDirective>
    )

})

export default inject('authStore')(inject('serverStore')(observer(ServerEdit)));
