import { useState, useRef, useEffect, Component } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import ReactDOM from 'react-dom/client';
import React from 'react';

function SellerProp() {

    const { sellerID, sellerFirstName, sellerSurname} = useParams()
    const urlAddProperty = `/propForm/${sellerID}/${sellerFirstName}/${sellerSurname}`
    const [propertyList, setpropertyList] = useState([])
    const [propertyList1, setpropertyList1] = useState([])

    const navigate = useNavigate()
    const amendButton = useRef();
    const idRef = useRef()
    const addressRef = useRef()
    const postcodeRef = useRef()
    const typeRef = useRef()
    const priceRef = useRef()
    const bedroomRef = useRef()
    const bathroomRef = useRef()
    const gardenRef = useRef()
    const statusRef = useRef()

    useEffect(() => {

        fetch(`http://localhost:8080/property/read`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            .then(pList => { setpropertyList(pList.filter(property => property.seller.seller_id == sellerID)) }) //linking IDs
            .catch(error => {
                console.error(error);
            });
    }, []);

    propertyList.filter(property => property.seller.id === sellerID)
function getData(){
    fetch(`http://localhost:8080/property/read`)
    .then((response) => {
        if (!response.ok) {
            alert("An error has occured, unable to read sellers");
            throw response.status;
        } else return response.json();
    })
    // .then(sellers => { setpropertyList(sellers) })
    .then(pList => { setpropertyList(pList.filter(property => property.seller.seller_id == sellerID)) }) //linking IDs
    .catch(error => {
        console.error(error);
    });
}

    function removeR(recno) {

        let tempR = propertyList.filter(recs => recs.property_id != recno)
        let choice = window.confirm("Are you sure you want to delete this record")
        if (choice) {
            setpropertyList(tempR)


            fetch(`http://localhost:8080/property/${recno}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(deletedData => {
                    console.log('JSON entry deleted successfully!', deletedData);
                    // Perform additional actions as needed after successful deletion
                })
                .catch(error => {
                    console.error('Failed to delete JSON entry:', error);
                });
        }
        else { }
    };

    function resubmit(recno) {

        const statusChange = { status: "FOR SALE" };

        fetch(`http://localhost:8080/property/update/${recno}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statusChange)
        })
            .then(response => response.json())
            .then(data=>getData())
        
            .catch(error => {
                console.error('Failed to delete JSON entry:', error);
            });



    }

    // function withdraw(recno) {

    //     const statusChange = { status: "WITHDRAWN" };

    //     fetch(`http://localhost:8080/property/update/${recno}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(statusChange)
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 alert("An error has occured, unable to read sellers");
    //                 throw response.status;
    //             } else return response.json();
    //         })
    //         .then(data=>getData())
    //         .catch(error => {
    //             console.error('Failed to delete JSON entry:', error);
    //         });



    // }
    function setStatus(recno, status) {

        //  const statusChange = { status: "WITHDRAWN" };
        const url = `http://localhost:8080/property/update/${recno}/status/${status}`;

        fetch(url, {
            method: 'PATCH',
        })
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            .then(data => getData())

            .catch(error => {
                console.error('Failed to delete JSON entry:', error);
            });
        }

    const [isAmend, setAmend] = useState(true);

    function canc() {
        setAmend(true)
        fetch(`http://localhost:8080/property/read`)
        .then((response) => {
            if (!response.ok) {
                alert("An error has occured, unable to read sellers");
                throw response.status;
            } else return response.json();
        })
        .then(pList => { setpropertyList(pList.filter(property => property.seller.id == sellerID)) }) //linking IDs
        .catch(error => {
            console.error(error);
        });
    }

    const handleStatusChange = (event, ref) => {
        // Update the value in the ref
        ref.current.value = event.target.value;
    }; // handles the change event of the status <select> element

    function amend(recno) {

        if (amendButton.current.value == "Amend") {
            setAmend(false)
            setpropertyList(propertyList.filter(property => property.property_id == recno.id))
        }
        else if (amendButton.current.value == "Save") {


            const tempR = {
                "type": typeRef.current.value,
                "price": priceRef.current.value,
                "bedrooms": bedroomRef.current.value,
                "bathrooms": bathroomRef.current.value,
                "garden": gardenRef.current.value,
                "address": addressRef.current.value,
                // "postcode": postcodeRef.current.value,
                // "sellerId": {recno.seller.id},
                "status": statusRef.current.value

            }

            fetch(`http://localhost:8080/property/update/${recno.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempR)
            })
                .then((response) => {
                    if (!response.ok) {
                        alert("An error has occured, unable to read sellers");
                        throw response.status;
                    } else return response.json();
                })
                .then()
                .catch(error => {
                    console.error('Failed to delete JSON entry:', error);
                });


            fetch(`http://localhost:8080/property/read`)
                .then((response) => {
                    if (!response.ok) {
                        alert("An error has occured, unable to read sellers");
                        throw response.status;
                    } else return response.json();
                })
                // .then(sellers => { setpropertyList(sellers) })
                .then(pList => { setpropertyList(pList.filter(property => property.seller.id == sellerID)) }) //linking IDs
                .catch(error => {
                    console.error(error);
                });

            setAmend(true)

        }

    }

    return (

        <>

            <main>

                <h1>Properties of <b>{sellerFirstName} {sellerSurname} </b> </h1>

                <container id="BbuttonBox">
                    <div class="topSeller">
                        <Link to={urlAddProperty} id="showButton" className="btn btn-dark "> Add a property </Link>



                    </div>

                </container>


                <table class="table1">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Address</th>
                        <th scope="col">Postcode</th>
                        <th scope="col">Type</th>
                        <th scope="col">Price</th>
                        <th scope="col">Bedroom</th>
                        <th scope="col">Bathroom</th>

                        <th scope="col">Garden</th>

                        <th scope="col">Status</th>
                        <th scope="col">Changes</th>
                        {/* <th scope="col"></th> */}
                        <th></th>

                    </tr>
                    {

                        propertyList.map(rec => <tr>

                            <td><span>{rec.property_id}</span></td>
                            {
                                isAmend == true ?

                                    <td id="pList"> <span>{rec.address} </span> </td> : <td> <span> <input type="text" id="recid" value={rec.address} ref={addressRef} onChange={(event) => handleStatusChange(event, addressRef)}></input> </span>  </td>

                            }

                            {
                                isAmend == true ?

                                    <td><span>{rec.postcode}</span></td> : <td><span> <input type="text" id="recid" ref={postcodeRef} value={rec.postcode}  onChange={(event) => handleStatusChange(event, postcodeRef)}></input> </span></td>

                            }
                            {
                                isAmend == true ?

                                    <td><span>{rec.type}</span></td> : <td> <select ref={typeRef} onChange={(event) => handleStatusChange(event, typeRef)}>
                                        <option value="DETACHED"> Detached </option>
                                        <option value="SEMI"> SEMI </option>
                                        <option value="APARTMENT"> Apartment </option>


                                    </select ></td>

                            }

                            {
                                isAmend == true ?

                                    <td><span>{rec.price}</span></td> : <td><span>  <input ref={priceRef}
                                        type="number" step="10000"  value={rec.price} 
                                        id="ex1"
                                        onChange={(event) => handleStatusChange(event, priceRef)}

                                    /> </span></td>

                            }
                            {
                                isAmend == true ?

                                    <td><span>{rec.bedrooms}</span></td> : <td>

                                        <input ref={bedroomRef}
                                            type="number"
                                            value={rec.bedrooms} 
                                            class="form-control input-sm" id="inputsm"
                                            onChange={(event) => handleStatusChange(event, bedroomRef)}

                                        />
                                    </td>

                            }
                            {
                                isAmend == true ?

                                    <td><span>{rec.bathrooms}</span></td> : <td>

                                        <input ref={bathroomRef}
                                            type="number"
                                            value={rec.bathrooms} 
                                            class="form-control input-sm" id="inputsm"
                                            onChange={(event) => handleStatusChange(event, bathroomRef)}

                                        />
                                    </td>


                            }

                            {
                                isAmend == true ?

                                    <td><span>{rec.garden}</span></td> : <td>

                                        <input ref={gardenRef}
                                            type="number"
                                            value={rec.garden} 
                                            class="form-control input-sm" id="inputsm"
                                            onChange={(event) => handleStatusChange(event, gardenRef)}

                                        />
                                    </td>

                            }

                            {/* <td><span>{rec.sellerId}</span></td> */}
                            {
                                isAmend == true ?

                                    <td>
                                        <span>{rec.status}</span></td> : <td>
                                        <select ref={statusRef} onChange={(event) => handleStatusChange(event, statusRef)}>

                                            <option>WITHDRAWN</option>
                                            <option>FOR SALE</option>
                                            <option>SOLD</option>
                                        </select>
                                    </td>

                            }
                            {/* <td><span>{rec.buyerId}</span></td> */}

                            {
                                rec.status == "FOR SALE" || rec.status == "WITHDRAWN" ?
                                    rec.status == "FOR SALE" ?
                                    <td><div className="topSeller"><button className="btn btn-primary" onClick={() => setStatus(rec.property_id, "WITHDRAWN")}>Withdraw</button></div></td>
                                    :
                                    <td><div className="topSeller"><button className="btn btn-success" onClick={() => setStatus(rec.property_id, "FOR SALE")}>Resubmit</button></div></td>



                                    :
                                    <td>  </td>


                            } 
                         


                            {
                                rec.status == "FOR SALE" ?

                                    isAmend == true ?
                                        <td><div className="topSeller"><button className="btn btn-warning" value="Amend" ref={amendButton} onClick={() => amend(rec)}>Amend</button></div></td>
                                        :
                                        <td><div className="topSeller"><button className="btn btn-success" value="Save" ref={amendButton} onClick={() => amend(rec)}>Save</button></div>
                                            <div className="topSeller"><button className="btn btn-danger" value="Cancel" onClick={() => canc()}>Cancel</button></div>
                                        </td>
                                    :
                                    <td>  </td>
                            }


{/* 
                            <td>                    <Link to={urlAddProperty}> Inspect Property </Link>
                            </td> */}
                            <td>    <button className="my-button">
                                <FontAwesomeIcon icon={faTrash} onClick={() => removeR(rec.id)} />
                            </button></td>
                        </tr>
                        )
                    }
                </table>
                {/* </div> */}
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />



            </main>


        </>);
}



export default SellerProp;
