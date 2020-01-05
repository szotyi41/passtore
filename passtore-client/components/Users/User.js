import React, { useState } from 'react'
import ReactDirective from 'react-directive'
import Moment from 'react-moment'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { inject, observer } from 'mobx-react'
import Highlight from 'react-highlighter'

const User = (props) => {
    const user = props.user
    const { searchText } = props.userStore

    return (
        <tr>
            <td><Highlight search={searchText}>{user.name}</Highlight></td>
            <td><Highlight search={searchText}>{user.email}</Highlight></td>
            <td><span>{user.role}</span></td>
            <td><span><Moment fromNow>{user.created_at}</Moment></span></td>
            <td>
                <ButtonGroup>
                    <Button variant="primary" size="sm" onClick={e => props.onEdit()}><FontAwesomeIcon icon={faEdit} /> Edit</Button>
                    <Button variant="danger" size="sm" onClick={e => props.onRemove()}><FontAwesomeIcon icon={faTrash} /> Remove</Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}

export default inject('userStore')(observer(User));