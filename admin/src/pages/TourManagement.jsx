import React, { useState } from "react";
import { Container, Row, Col, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { BASE_URL } from "../utils/config";
import useFetch from "../hooks/useFetch";

const TourManagement = () => {
    const { data: tourData, loading, error, reFetch } = useFetch(`${BASE_URL}/tours`);
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        cities: "",
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
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'file') {
            if (name === 'photos') {
                setFormData(prev => ({ ...prev, [name]: files }));
            } else {
                setFormData(prev => ({ ...prev, [name]: files[0] }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const deleteTour = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/tours/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            const result = await res.json();
            if (res.ok) {
                alert(result.message);
                reFetch();
            } else {
                alert(result.message);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("title", formData.title);

            // Split cities string into array and append
            const citiesArray = formData.cities.split(',').map(city => city.trim());
            citiesArray.forEach(city => {
                data.append("cities", city);
            });

            data.append("address", formData.address || "");
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
                credentials: "include",
                body: data,
            });
            const result = await res.json();
            if (res.ok) {
                alert("Tour added successfully");
                setModal(false);
                reFetch();
                setFormData({
                    title: "",
                    cities: "",
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
                    <Col>
                        <Button color="primary" onClick={toggle}>Add New Tour</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered responsive>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Featured</th>
                                    <th>Max Group Size</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && <tr><td colSpan="5">Loading...</td></tr>}
                                {error && <tr><td colSpan="5">{error}</td></tr>}
                                {!loading && !error && tourData?.map(tour => (
                                    <tr key={tour._id}>
                                        <td>{tour.title}</td>
                                        <td>${tour.price}</td>
                                        <td>{tour.featured ? "Yes" : "No"}</td>
                                        <td>{tour.maxGroupSize}</td>
                                        <td>
                                            <Button color="danger" onClick={() => deleteTour(tour._id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Modal isOpen={modal} toggle={toggle} size="lg">
                    <ModalHeader toggle={toggle}>Add Tour</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label>Title</Label>
                                        <Input type="text" name="title" required onChange={handleChange} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Address</Label>
                                        <Input type="text" name="address" required onChange={handleChange} />
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Cities (comma separated)</Label>
                                        <Input type="text" name="cities" required onChange={handleChange} />
                                    </FormGroup>
                                </Col>
                            </Row >
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
                                <ReactQuill
                                    theme="snow"
                                    value={formData.desc}
                                    onChange={(value) => setFormData(prev => ({ ...prev, desc: value }))}
                                />
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
                                        <Input type="file" name="mainPhoto" required onChange={handleChange} accept="image/*,video/*" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Gallery Photos</Label>
                                        <Input type="file" name="photos" multiple onChange={handleChange} accept="image/*,video/*" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button color="primary" type="submit">
                                Add Tour
                            </Button>
                        </Form >
                    </ModalBody >
                </Modal>
            </Container>
        </section>
    );
};

export default TourManagement;
