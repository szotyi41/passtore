import React, { useState } from 'react'
import ReactDirective from 'react-directive'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { inject, observer } from 'mobx-react'
import Highlight from 'react-highlighter'

const Vendor = (props) => {
    const vendor = props.vendor
    const { searchText } = props.vendorStore

    return (
        <ReactDirective>
            <Card className="mb-1">
                <Card.Body>
                    <Card.Title>
                        <Highlight search={searchText} style={{color: vendor.color || '#fff'}}>{vendor.name}</Highlight>
                    </Card.Title>

                    <Card.Text>IP: <Highlight search={searchText}>{vendor.ip}</Highlight></Card.Text>

                    <ButtonGroup>
                        <Button variant="primary" size="sm" onClick={e => props.onEdit()}><FontAwesomeIcon icon={faEdit} /> Edit</Button>
                        <Button variant="danger" size="sm" onClick={e => props.onRemove()}><FontAwesomeIcon icon={faTrash} /> Remove</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>

            <style jsx="true">{`
            .card-text {
                margin-bottom: 0;
            }
            `}</style>
        </ReactDirective>
    )
}

export default inject('vendorStore')(observer(Vendor));