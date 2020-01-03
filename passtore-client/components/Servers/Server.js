import React, { useState } from 'react'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { inject, observer } from 'mobx-react'
import Highlight from 'react-highlighter'

const Server = (props) => {
    const server = props.server
    const { searchText } = props.serverStore

    return (
        <Card className="mb-1">
            <Card.Body>
                <Card.Title>
                    <Highlight search={searchText} style={{color: server.color || '#fff'}}>{server.name}</Highlight>
                </Card.Title>
                <Card.Text>
                    <h6>IP: <Highlight search={searchText}>{server.local_ip} | {server.global_ip} </Highlight></h6>
                    <h6>Domains: <Highlight search={searchText}>{server.domains.map(domain => domain.name).join(', ')}</Highlight></h6>
                    <h6>Services: <Highlight search={searchText}>{server.services.map(service => service.name).join(', ')}</Highlight></h6>

                    <ButtonGroup>
                        <Button variant="primary" size="sm" onClick={e => props.onEdit()}><FontAwesomeIcon icon={faEdit} /></Button>
                        <Button variant="danger" size="sm" onClick={e => props.onRemove()}><FontAwesomeIcon icon={faTrash} /></Button>
                    </ButtonGroup>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default inject('serverStore')(observer(Server));