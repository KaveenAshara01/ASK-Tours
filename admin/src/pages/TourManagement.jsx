import React, { useState } from "react";
import { Container, Row, Col, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";
import { BASE_URL } from "../utils/config";
import useFetch from "../hooks/useFetch";

const TourManagement = () => {
    const { data: tourData, loading, error, reFetch } = useFetch(`${BASE_URL}/tours`);
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        city: "",
        address: "",
        distance: "",
        price: "",
        maxGroupSize: "",
        desc: "",
        featured: false,
        tourType: "Adventure",
        mainPhoto: null,
        photos: [],
    });

    const toggle = () => setModal(!modal);

    const handleChange = (e) => {
        if (e.target.name === 'mainPhoto') {
            setFormData({ ...formData, mainPhoto: e.target.files[0] });
        } else if (e.target.name === 'photos') {
            setFormData({ ...formData, photos: e.target.files });
        } else if (e.target.name === 'featured') {
            setFormData({ ...formData, featured: e.target.checked });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("city", formData.city);
            data.append("address", formData.address || ""); // Address might be optional or part of city
            data.append("distance", formData.distance);
            data.append("price", formData.price);
            data.append("maxGroupSize", formData.maxGroupSize);
            data.append("desc", formData.desc);
            data.append("featured", formData.featured);
            data.append("tourType", formData.tourType);

            if (formData.mainPhoto) {
                data.append("mainPhoto", formData.mainPhoto);
            }

            if (formData.photos) {
                for (let i = 0; i < formData.photos.length; i++) {
                    data.append("photos", formData.photos[i]);
                }
            }

            const res = await fetch(`${BASE_URL}/tours`, {
                method: "POST",
                body: data,
                credentials: "include",
            });
            const result = await res.json();
            if (result.success) {
                alert("Tour added successfully");
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
        if (window.confirm("Are you sure you want to delete this tour?")) {
            try {
                const res = await fetch(`${BASE_URL}/tours/${id}`, {
                    method: "DELETE",
                    credentials: "include",
                });
                const result = await res.json();
                if (result.success) {
                    alert("Tour deleted successfully");
                    reFetch();
                } else {
                    alert(result.message);
                }
            } catch (err) {
                alert(err.message);
            }
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12" className="d-flex justify-content-between align-items-center mb-4">
                        <h2>Tour Management</h2>
                        <Button color="primary" onClick={toggle}>
                            Add Tour
                        </Button>
                    </Col>
                    <Col lg="12">
                        {loading && <h4>Loading...</h4>}
                        {error && <h4>{error}</h4>}
                        {!loading && !error && (
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>City</th>
                                        <th>Price</th>
                                        <th>Group Size</th>
                                        <th>Featured</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tourData?.map((tour) => (
                                        <tr key={tour._id}>
                                            <td>{tour.title}</td>
                                            <td>{tour.cities?.join(", ") || tour.city}</td>
                                            <td>${tour.price}</td>
                                            <td>{tour.maxGroupSize}</td>
                                            <td>{tour.featured ? "Yes" : "No"}</td>
                                            <td>
                                                <Button color="danger" size="sm" onClick={() => handleDelete(tour._id)}>
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

            <Modal isOpen={modal} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}>Add New Tour</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Title</Label>
                                    <Input type="text" name="title" required onChange={handleChange} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>City</Label>
                                    <Input type="text" name="city" required onChange={handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>Price</Label>
                                    <Input type="number" name="price" required onChange={handleChange} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>Distance (km)</Label>
                                    <Input type="number" name="distance" required onChange={handleChange} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>Max Group Size</Label>
                                    <Input type="number" name="maxGroupSize" required onChange={handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input type="textarea" name="desc" required onChange={handleChange} />
                        </FormGroup>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Tour Type</Label>
                                    <Input type="select" name="tourType" onChange={handleChange} value={formData.tourType}>
                                        <option value="Adventure">Adventure</option>
                                        <option value="Relaxation">Relaxation</option>
                                        <option value="Cultural">Cultural</option>
                                        <option value="Wildlife">Wildlife</option>
                                        <option value="Other">Other</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={6} className="d-flex align-items-center">
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="featured" onChange={handleChange} />{' '}
                                        Featured Tour
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Main Photo</Label>
                                    <Input type="file" name="mainPhoto" required onChange={handleChange} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Gallery Photos</Label>
                                    <Input type="file" name="photos" multiple onChange={handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button color="primary" type="submit">
                            Add Tour
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </section>
    );
};

export default TourManagement;
