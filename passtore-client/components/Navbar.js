import React from 'react'
import ReactDirective from 'react-directive'
import Link from 'next/link'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { inject, observer, toJS } from 'mobx-react'

const NavbarTop = (props) => {

	const { user } = props.authStore

	const logOut = () => props.authStore.logout()

	return (
		<ReactDirective>
			<Navbar className="d-flex justify-content-between" bg="dark" expand="sm">
				
				<Nav>
					<Link href="/servers" replace><Nav.Link href="/servers">Servers</Nav.Link></Link>
					<Link href="/virtuals" replace data-react-if={user.role === 'admin'}><Nav.Link href="/virtuals">Virtuals</Nav.Link></Link>
					<Link href="/vendors" replace data-react-if={user.role === 'admin'}><Nav.Link href="/vendors">Physical Machines</Nav.Link></Link>
					<Link href="/users" replace data-react-if={user.role === 'admin'}><Nav.Link href="/users">Users</Nav.Link></Link>
				</Nav>

				<Button className="btn-xs float-right" variant="primary" onClick={e => logOut()}>Log Out</Button>
			</Navbar>
		</ReactDirective>
	)
}

export default inject('authStore')(observer(NavbarTop));
