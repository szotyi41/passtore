import React, { useState } from 'react'
import { Button, Form, Modal, InputGroup, Tooltip, OverlayTrigger } from 'react-bootstrap'
import Toggle from 'react-bootstrap-toggle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faCopy } from '@fortawesome/free-solid-svg-icons'
import { inject, observer } from 'mobx-react'
import toastr from 'toastr'
import $ from 'jquery'

const Service = (props) => {

    const service = props.service
    const serviceTypes = props.serverStore.serviceTypes

    const [ invalidName, setInvalidName ] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)

    const setServiceType = (type) => props.serverStore.setServiceType({...service, type: type})
    const setService = (field, value) => {
        props.serverStore.setService(service, field, value)

        // Generate command if has pattern
        if (service.command_pattern) {
            props.serverStore.setService(service, 'command', buildCommand())
        }
    }
    const setClipboard = (field) => { 
        navigator.clipboard.writeText(field)
        toastr.success('Copied!') 
    }

    const buildCommand = () => {
        let command = service.command_pattern
        Object.keys(service).forEach(serviceKey => command = command.replace('{' + serviceKey + '}', service[serviceKey]))
        return command
    }

    return (
        <div className="service" id={service._id}>

            {/* Service Enabled */}
            <Form.Group className="d-md-flex align-content-center align-items-center">
                <label htmlFor="service-status" className="w-25">Status</label>
                <InputGroup>
                <Toggle
                    id="service-status"
                    className="toggle"
                    onClick={toggle => setService('enabled', toggle)}
                    on="Enabled"
                    off="Disabled"
                    offstyle="danger"
                    active={service.enabled}
                />
                </InputGroup>           
            </Form.Group> 

            {/* Service Type */}
            <Form.Group className="d-md-flex align-content-center align-items-center">
                <label htmlFor="service-type" className="w-25">Service Type</label>
                <InputGroup>
                    <Form.Control as="select" placeholder="Service Type" id="service-type" value={service.type} onChange={e => setServiceType(e.target.value)}>
                        <option value="">-- Select service type --</option>
                        {Object.values(serviceTypes).map(type => <option key={type.name} value={type.name}>{type.name}</option>)}
                    </Form.Control>
                </InputGroup>
            </Form.Group>

            {/* Service Name */}
            <Form.Group className="d-md-flex align-content-center align-items-center">
                <label htmlFor="service-name" className="w-25">Service Name</label>
                <InputGroup>
                    <Form.Control type="text" 
                        placeholder="Service Name" 
                        id="service-name" 
                        value={service.name} 
                        onChange={e => { 
                            setService('name', e.target.value); 
                            setInvalidName(false) 
                        }}
                        className={invalidName ? 'is-invalid' : ' '}
                    />
                </InputGroup>
            </Form.Group>
                    
            {/* Dynamic fields */}
            {service.type === '' ? '' : serviceTypes[service.type].fields.map(field => {

                if (field.type === 'text') {
                    return (
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <label htmlFor={service._id + '-' + field.name} className="w-25">{field.label}</label>
                            <InputGroup>
                                <Form.Control type="text" 
                                    placeholder={field.label}
                                    id={service._id + '-' + field.name} 
                                    value={service[field.name]} 
                                    onChange={e => setService(field.name, e.target.value)} 
                                />
                                <InputGroup.Append>
                                    <OverlayTrigger placement="top" delay={{ show: 100, hide: 400 }} overlay={<Tooltip>Copy field</Tooltip>}>
                                        <Button variant="outline-primary" onClick={() => setClipboard(service[field.name])}><FontAwesomeIcon icon={faCopy} /></Button>
                                    </OverlayTrigger>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    )
                }

                if (field.type === 'username') {
                    return (
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <label htmlFor={service._id + '-' + field.name} className="w-25">{field.label}</label>
                            <InputGroup>
                                <Form.Control type="text" 
                                    placeholder={field.label}
                                    id={service._id + '-' + field.name} 
                                    value={service[field.name]} 
                                    onChange={e => setService(field.name, e.target.value)} 
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-primary" onClick={() => setClipboard(service[field.name])}><FontAwesomeIcon icon={faCopy} /></Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    )
                }

                if (field.type === 'password') {
                    return (
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <label htmlFor={service._id + '-' + field.name} className="w-25">{field.label}</label>
                            <InputGroup>
                                <Form.Control 
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder={field.label} 
                                    id={service._id + '-' + field.name} 
                                    value={service[field.name]} 
                                    onChange={e => setService(field.name, e.target.value)} 
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-primary" onClick={() => setShowPassword(!showPassword)}><FontAwesomeIcon icon={faLock} /></Button>
                                    <Button variant="outline-primary" onClick={() => setClipboard(service[field.name])}><FontAwesomeIcon icon={faCopy} /></Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    )
                }

                if (field.type === 'number') {
                    return (
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <label htmlFor={field.type + '-' + field.name} className="w-25">{field.label}</label>
                            <InputGroup>
                                <Form.Control type="number" 
                                    placeholder={field.label}
                                    id={field.type + '-' + field.name} 
                                    value={service[field.name]} 
                                    onChange={e => setService(field.name, e.target.value)} 
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-primary" onClick={() => setClipboard(service[field.name])}><FontAwesomeIcon icon={faCopy} /></Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    )
                }

                if (field.type === 'command') {
                    return (
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <label htmlFor={service._id + '-' + field.name} className="w-25">{field.label}</label>
                            <InputGroup>
                                <Form.Control type="text" 
                                    placeholder={field.label}
                                    id={service._id + '-' + field.name} 
                                    value={service[field.name]} 
                                    onChange={e => setService(field.name, e.target.value)} 
                                />
                                <InputGroup.Append>
                                    <OverlayTrigger placement="top" delay={{ show: 100, hide: 400 }} overlay={<Tooltip>Copy field</Tooltip>}>
                                        <Button variant="outline-primary" onClick={() => setClipboard(service[field.name])}><FontAwesomeIcon icon={faCopy} /></Button>
                                    </OverlayTrigger>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    )
                }

            })}

            {/* Comment */}
            <Form.Group className="d-md-flex align-content-center align-items-center">
                <label htmlFor={service._id + '-comment'} className="w-25">Comment</label>
                <InputGroup>
                    <Form.Control as="textarea" 
                        rows="3" 
                        placeholder="Comment" 
                        id={service._id + '-comment'}
                        value={service.comment} 
                        onChange={e => setService('comment', e.target.value)} 
                    />
                </InputGroup>
            </Form.Group>

            <style jsx="true">{`
                .service {
                    display: none;
                }

                .toggle {
                    min-width: 96px !important; 
                    min-height: 30px;
                }

                .toggle .btn {
                    line-height: initial !important;
                    font-size: 12px !important;
                }
            `}</style>
        </div>
    )

}

export default inject('serverStore')(observer(Service));
