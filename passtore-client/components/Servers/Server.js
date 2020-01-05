import React, { useState } from 'react'
import ReactDirective  from  'react-directive'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { inject, observer } from 'mobx-react'
import Highlight from 'react-highlighter'

const Server = (props) => {
    const server = props.server
    const { searchText } = props.serverStore
    const { user } = props.authStore

    return (
        <ReactDirective>
            <Card className="mb-1">
                <Card.Body>
                    <Card.Title>
                        <Highlight search={searchText} style={{color: server.color || '#fff'}}>{server.name}</Highlight>
                    </Card.Title>

                    <Card.Text data-react-if={user.role === 'admin'}>IP: <Highlight search={searchText}>{server.local_ip}</Highlight> | <Highlight search={searchText}>{server.global_ip}</Highlight></Card.Text>
                    <Card.Text>Domains: <Highlight search={searchText}>{server.domains.map(domain => domain.name).join(', ')}</Highlight></Card.Text>
                    <Card.Text>Services: <Highlight search={searchText}>{server.services.map(service => service.name).join(', ')}</Highlight></Card.Text>

                    <ButtonGroup>
                        <Button variant="primary" size="sm" onClick={e => props.onEdit()}><FontAwesomeIcon icon={faEdit} /> Edit</Button>
                        <Button variant="danger" size="sm" onClick={e => props.onRemove()} data-react-if={user.role === 'admin'}><FontAwesomeIcon icon={faTrash} /> Remove</Button>
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

export default inject('authStore')(inject('serverStore')(observer(Server)));