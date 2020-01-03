import React, { useState } from 'react'
import Router from 'next/router'
import { Button, Form, Card, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { inject, observer } from 'mobx-react'

const Login = (props) => {

    const { email, password, loading, invalid } = props.authStore

    const logIn = () => {
        props.authStore.login().then(response => {
            Router.push('/servers')
        })
    }

    return (
        <div>
            <Card style={{ width: '18rem' }} className="login-card">
                <Card.Body>
                <Form>

                    <h1 className="center">Login</h1>

                    <Form.Group controlId="email">
                        <InputGroup>
                            <Form.Control type="email" placeholder="Enter email"  aria-describedby="email-icon" value={email} onChange={e => props.authStore.setEmail(e.target.value)} />
                            <InputGroup.Append>
                                <InputGroup.Text id="email-icon"><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <InputGroup>
                            <Form.Control type="password" placeholder="Enter password"  aria-describedby="password-icon" value={password} onChange={e => props.authStore.setPassword(e.target.value)} />
                            <InputGroup.Append>
                                <InputGroup.Text id="password-icon"><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Button variant="primary" type="button" className="w-100" disabled={loading} onClick={e => logIn()}>
                            {loading ? <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> : '' }
                            Login
                        </Button>
                    </Form.Group>

                    {invalid ? <div className="alert alert-danger" role="alert">Invalid email or password.</div> : ''}
                </Form>
                </Card.Body>
            </Card>
            <style jsx="true">{`
                .login-card {
                    position: absolute;
                    transform: translate(-50%, -50%);
                    left: 50%;
                    top: 50%;
                }

                .spinner-grow {
                    margin-right: 8px
                }
            `}</style>
        </div>
    )
}

export default inject('authStore')(observer(Login));
