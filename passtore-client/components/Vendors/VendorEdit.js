import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react'
import { Button, ButtonGroup, Form, Modal, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons'
import { inject, observer, toJS } from 'mobx-react'
import { TwitterPicker } from 'react-color'
import toastr from 'toastr'
import $ from 'jquery'


const VendorEdit = forwardRef((props, ref) => {

    const ip_regex = /^(([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])(\.(?!$)|(?=$))){4}$/
    const vendor = props.vendorStore.vendor
    const { name, color, ip, comment } = vendor

    const [ showModal, setShowModal ] = useState(false)
    const [ invalidName, setInvalidName ] = useState(false)
    const [ invalidIp, setInvalidIp ] = useState(false)

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

    const setVendor = (field, value) => props.vendorStore.setVendorField(vendor, field, value)

    // Close vendor edit modal
    const close = () => {
        props.vendorStore.setVendor(props.vendorStore.oldvendor)
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

        // IP
        if (!ip || !ip_regex.test(ip)) {
            setInvalidIp(true)
            err = true
        }

        if (!err) props.vendorStore.saveVendor().then(() => {
            toastr.success('Vendor saved successfully')
            setShowModal(false)
        }).catch(error => {
            toastr.error('Failed to save vendor')
        })
    }

    const setClipboard = (field) => {
        toastr.success('Copied successfully')
        navigator.clipboard.writeText(field)
    }

    return (
        <div>
            <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Vendor</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        {/* Name */}
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <label htmlFor="vendor-name" className="w-25">Name</label>
                            <InputGroup className="position-relative"> 
                                <Form.Control type="text" 
                                    placeholder="Name" 
                                    id="vendor-name" 
                                    value={name} 
                                    onChange={e => { setVendor('name', e.target.value); setInvalidName(false) }}
                                    className={invalidName ? 'is-invalid' : ' '}
                                />
                                <InputGroup.Append>
                                    <div className="color-picker">
                                        <TwitterPicker style={{display: 'none'}} onChangeComplete={color => setVendor('color', color.hex)} />
                                    </div>
                                    <Button variant="outline-primary" style={{backgroundColor: color, border: 'none', width: '40px'}} onClick={e => $('.color-picker').fadeToggle()}> </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        {/* IP */}
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <label htmlFor="vendor-ip" className="w-25">IP</label>
                            <InputGroup>
                                <Form.Control type="text" 
                                    placeholder="IP" 
                                    id="vendor-ip" 
                                    value={ip} 
                                    onChange={e => { setVendor('ip', e.target.value); setInvalidIp(false) }} 
                                    className={invalidIp ? 'is-invalid' : ''}
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-primary" onClick={e => setClipboard(ip)}><FontAwesomeIcon icon={faCopy} /></Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        {/* Comment */}
                        <Form.Group className="d-md-flex align-content-center align-items-center">
                            <label htmlFor="vendor-comment" className="w-25">Comment</label>
                            <InputGroup>
                                <Form.Control as="textarea" 
                                    rows="3"
                                    id="vendor-comment"
                                    placeholder="Comment" 
                                    value={comment} 
                                    onChange={e => setVendor('comment', e.target.value)} 
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
        </div>
    )

})

export default inject('vendorStore')(observer(VendorEdit));
