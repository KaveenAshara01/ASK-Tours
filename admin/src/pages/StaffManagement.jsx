import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";
import Select from "react-select";
import { BASE_URL } from "../utils/config";
import useFetch from "../hooks/useFetch";
import { languages } from "../utils/languages";

const StaffManagement = () => {
    const { data: staffData, loading, error, reFetch } = useFetch(`${BASE_URL}/staff/admin`);
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        photo: "",
        role: "driver",
        phone: "",
        vehicle: "",
        languages: [],
    });

    const toggle = () => setModal(!modal);

    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            setFormData({ ...formData, photo: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleLanguageChange = (selectedOptions) => {
        setFormData({ ...formData, languages: selectedOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("role", formData.role);
            data.append("phone", formData.phone);
            if (formData.photo) {
                data.append("photo", formData.photo);
            }

            if (formData.role === "guide") {
                formData.languages.forEach(option => data.append("languages", option.value));
            } else {
                data.append("vehicle", formData.vehicle);
            }

            const res = await fetch(`${BASE_URL}/staff`, {
                method: "POST",
                body: data,
                credentials: "include",
            });
            const result = await res.json();
            if (result.success) {
                alert("Staff added successfully");
                toggle();
                reFetch();
            } else {
                alert(result.message);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this staff member?")) {
            try {
                const res = await fetch(`${BASE_URL}/staff/${id}`, {
                    method: "DELETE",
                    credentials: "include",
                });
                const result = await res.json();
                if (result.success) {
                    alert("Staff deleted successfully");
                    reFetch();
                } else {
                    alert(result.message);
                }
            } catch (err) {
                alert(err.message);
            }
        }
    };

    const toggleAvailability = async (id, currentStatus) => {
        try {
            const res = await fetch(`${BASE_URL}/staff/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isAvailable: !currentStatus }),
                credentials: "include",
            });
            const result = await res.json();
            if (result.success) {
                reFetch();
            } else {
                alert(result.message);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12" className="d-flex justify-content-between align-items-center mb-4">
                        <h2>Staff Management</h2>
                        <Button color="primary" onClick={toggle}>
                            Add Staff
                        </Button>
                    </Col>
                    <Col lg="12">
                        {loading && <h4>Loading...</h4>}
                        {error && <h4>{error}</h4>}
                        {!loading && !error && (
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staffData?.map((staff) => (
                                        <tr key={staff._id}>
                                            <td>{staff.name}</td>
                                            <td>{staff.role}</td>
                                            <td>{staff.email}</td>
                                            <td>{staff.phone}</td>
                                            <td>
                                                <Button
                                                    color={staff.isAvailable ? "success" : "secondary"}
                                                    size="sm"
                                                    onClick={() => toggleAvailability(staff._id, staff.isAvailable)}
                                                >
                                                    {staff.isAvailable ? "Available" : "Busy"}
                                                </Button>
                                            </td>
                                            <td>
                                                <Button color="danger" size="sm" onClick={() => handleDelete(staff._id)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Col>
                </Row>
            </Container>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add New Staff</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input type="text" name="name" required onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input type="email" name="email" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Photo</Label>
                            <Input type="file" name="photo" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Role</Label>
                            <Input type="select" name="role" onChange={handleChange} value={formData.role}>
                                <option value="driver">Driver</option>
                                <option value="guide">Tour Guide</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Phone</Label>
                            <Input type="text" name="phone" onChange={handleChange} />
                        </FormGroup>
                        {formData.role === "driver" && (
                            <FormGroup>
                                <Label>Vehicle</Label>
                                <Input type="text" name="vehicle" required onChange={handleChange} />
                            </FormGroup>
                        )}
                        {formData.role === "guide" && (
                            <FormGroup>
                                <Label>Languages</Label>
                                <Select
                                    isMulti
                                    options={languages}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={handleLanguageChange}
                                    value={formData.languages}
                                    required
                                />
                            </FormGroup>
                        )}
                        <Button color="primary" type="submit">
                            Add Staff
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </section>
    );
};

export default StaffManagement;
