import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Api, { endpoints } from '../configs/Api';
import cookies from 'react-cookies';

const Header = () => {
    const [categories, setCategories] = useState([])
    const [kw, setKw] = useState()
    const nav = useNavigate()
    const [user, dispatch] = useContext(UserContext)

    const search = (event) => {
        event.preventDefault()

        nav(`/?kw=${kw}`)
    }
    
    useEffect(() => {
        const loadCategories = async () => {
            let res = await Api.get(endpoints['categories'])
            setCategories(res.data)
        }

        loadCategories()
    }, [])

    const logout = (event) => {
        event.preventDefault()
        cookies.remove('access_token')
        cookies.remove('current_user')
        dispatch({"type": "logout"})
        nav("/login")
    }

    let btn = <>
        <Link to="/login" className="nav-link text-info">Dang nhap</Link>
        <Link to="/register" className="nav-link text-danger">Dang ky</Link>
    </>
    
    if (user != null) {
        btn = <>
            <Link to="/" className="nav-link text-info">Welcome {user.username}!</Link>
            <a href="#" onClick={logout} className="nav-link text-info">Dang xuat</a>
        </>
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/" className="nav-link">Trang chu</Link>

                    {categories.map(c => {
                        const url = `/?category_id=${c.id}`
                        return <Link to={url} className="nav-link">{c.name}</Link>
                    })}

                    {btn}
                </Nav>

                <Form onSubmit={search} className="d-flex">
                    <FormControl
                    type="search"
                    name="kw"
                    value={kw}
                    onChange={evt => setKw(evt.target.value)}
                    placeholder="Nhap tu khoa"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button type="submit" variant="outline-success">Tim</Button>
                </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default Header