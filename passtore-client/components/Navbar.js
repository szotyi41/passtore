import React from 'react'
import Link from 'next/link'
import { Container, Button, Breadcrumb } from 'react-bootstrap'


const Nav = () => {

	const logOut = () => props.authStore.logout()

	return (
		<Container>
			<Breadcrumb className="d-flex justify-content-between w-100">
		
				<Link href="/servers"><Breadcrumb.Item>Servers</Breadcrumb.Item></Link>
				<Link href="/machines"><Breadcrumb.Item>Physical Machines</Breadcrumb.Item></Link>
			

				<Button className="btn-xs float-right" variant="primary" onClick={e => logOut()}>Log Out</Button>
			</Breadcrumb>

			<style jsx>{`

			`}</style>
		</Container>
	)
}

export default Nav
