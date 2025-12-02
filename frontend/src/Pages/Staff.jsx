import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, Badge, Input, FormGroup, Label } from "reactstrap";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import CommonSection from "../shared/CommonSection";

const Staff = () => {
    const { data: staffData, loading, error } = useFetch(`${BASE_URL}/staff`);
    const [searchTerm, setSearchTerm] = useState("");
    const [languageFilter, setLanguageFilter] = useState("");

    const drivers = staffData?.filter(staff => staff.role === 'driver') || [];
    const guides = staffData?.filter(staff => staff.role === 'guide') || [];

    const filterStaff = (staffList) => {
        return staffList.filter(staff => {
            const matchesName = staff.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLanguage = languageFilter === "" || (staff.languages && staff.languages.some(lang => lang.toLowerCase().includes(languageFilter.toLowerCase())));
            return matchesName && matchesLanguage;
        });
    };

    const StaffCard = ({ staff }) => (
        <Col lg="3" md="4" sm="6" className="mb-4" key={staff._id}>
            <Card className="staff__card shadow-sm border-0 h-100">
                <div className="staff__img">
                    <img src={staff.photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="" className="w-100" style={{ height: '200px', objectFit: 'cover' }} />
                </div>
                <CardBody>
                    <div className="d-flex align-items-center justify-content-between">
                        <CardTitle tag="h5">{staff.name}</CardTitle>
                        <Badge color="success">Available</Badge>
                    </div>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        {staff.role === "driver" ? (
                            <span>
                                <i className="ri-car-line"></i> {staff.vehicle}
                            </span>
                        ) : (
                            <span>
                                <i className="ri-translate"></i> {staff.languages?.join(", ")}
                            </span>
                        )}
                    </CardSubtitle>
                    <div className="staff__contact mt-3">
                        {staff.phone && (
                            <p className="mb-0"><i className="ri-phone-line"></i> {staff.phone}</p>
                        )}
                        {staff.email && (
                            <p className="mb-0"><i className="ri-mail-line"></i> {staff.email}</p>
                        )}
                    </div>
                </CardBody>
            </Card>
        </Col>
    );

    return (
        <>
            <CommonSection title={"Our Team"} />
            <section>
                <Container>
                    <Row className="mb-5">
                        <Col lg="12">
                            <div className="search__bar d-flex align-items-center gap-4 p-4 shadow-sm rounded">
                                <FormGroup className="mb-0 w-50">
                                    <Label>Search by Name</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter name..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup className="mb-0 w-50">
                                    <Label>Filter by Language</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter language (e.g. English)..."
                                        value={languageFilter}
                                        onChange={(e) => setLanguageFilter(e.target.value)}
                                    />
                                </FormGroup>
                            </div>
                        </Col>
                    </Row>

                    {loading && <h4 className="text-center">Loading...</h4>}
                    {error && <h4 className="text-center">{error}</h4>}

                    {!loading && !error && (
                        <>
                            <Row className="mb-5">
                                <Col lg="12" className="mb-4">
                                    <h2 className="section__title">Meet Our Drivers</h2>
                                </Col>
                                {filterStaff(drivers).length > 0 ? (
                                    filterStaff(drivers).map(staff => <StaffCard staff={staff} key={staff._id} />)
                                ) : (
                                    <Col lg="12"><p>No drivers found.</p></Col>
                                )}
                            </Row>

                            <Row>
                                <Col lg="12" className="mb-4">
                                    <h2 className="section__title">Meet Our Tour Guides</h2>
                                </Col>
                                {filterStaff(guides).length > 0 ? (
                                    filterStaff(guides).map(staff => <StaffCard staff={staff} key={staff._id} />)
                                ) : (
                                    <Col lg="12"><p>No tour guides found.</p></Col>
                                )}
                            </Row>
                        </>
                    )}
                </Container>
            </section>
        </>
    );
};

export default Staff;
