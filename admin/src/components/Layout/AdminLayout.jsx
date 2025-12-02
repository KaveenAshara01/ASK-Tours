import React, { useContext } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Container, Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";

const AdminLayout = () => {
    const { user, dispatch } = useContext(AuthContext);

    const logout = () => {
        dispatch({ type: "LOGOUT" });
    };

    if (!user || user.role !== "admin") {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Navbar color="dark" dark expand="md" className="mb-4">
                <Container>
                    <NavbarBrand href="/">Admin Dashboard</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/staff" className="nav-link text-white">Staff</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/tours" className="nav-link text-white">Tours</Link>
                        </NavItem>
                        <NavItem>
                            <Button color="danger" size="sm" onClick={logout} className="ml-3">Logout</Button>
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>
            <Container>
                <Outlet />
            </Container>
        </div>
    );
};

export default AdminLayout;
