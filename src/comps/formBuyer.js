import { Link, useNavigate } from "react-router-dom"
import React, { useRef, useState, useEffect } from "react";



export default function NewForm2() {

    const forenameInputRef = useRef();
    const surnameInputRef = useRef();
    const addressInputRef = useRef();
    const postcodeInputRef = useRef();
    const phoneInputRef = useRef();
    const navigate = useNavigate()

    const [buyerList, setbuyerList] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/buyer/read`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read buyers");
                    throw response.status;
                } else return response.json();
            })
            .then(buyers => { setbuyerList(buyers) })
            .catch(error => {
                console.error(error);
            });
    }, []);


    function addR() {

        const tempR = {
            "firstName": forenameInputRef.current.value,
            "surname": surnameInputRef.current.value,
            "address": addressInputRef.current.value,
            "postcode": postcodeInputRef.current.value,
            "phone": phoneInputRef.current.value
        }


        const compareObjects = (obj1, obj2) => {
            const firstNameMatch = obj1.firstName.toLowerCase() === obj2.firstName.toLowerCase();
            const surNameMatch = obj1.surname.toLowerCase() === obj2.surname.toLowerCase();
            return firstNameMatch && surNameMatch;
        };

        if (!buyerList.some(item => compareObjects(item, tempR))) {
            if (forenameInputRef.current.value != "" && surnameInputRef.current.value != "") {



                fetch("http://localhost:8080/buyer/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(tempR)


                })
                    .then((response) => {
                        if (!response.ok) {
                            alert("An error has occured, unable to read buyers");
                            throw response.status;
                        } else navigate("/buyer");
                    })
                    .catch(error => {
                        console.error(error);
                    });


            }
            else {

                alert("Please input your full name")
            }

        } else {

            alert("Sorry, this user is already registered")
        }


    }



    function onK(event) {
        if (event.keyCode === 13) {

            addR()


        }


    }


    return (
        <main>




            <form id="buyerForm" class="row g-3 needs-validation" novalidate>
                <div class="form-row">
                    <div class="mx-auto col-10 col-md-8 col-lg-6">
                        <div for="validationCustom01" class="form-label form-group col form-control is-valid">
                            <label for="InputName">Forename</label>
                            <input type="Name" ref={forenameInputRef} class="form-control" id="InpForename validationCustom01" aria-describedby="InputName" placeholder="Enter your forename" required></input>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                        </div>

                        <div for="validationCustom02" class="form-label form-group col form-control is-valid">
                            <label for="InputName">Surname</label>
                            <input type="Name" ref={surnameInputRef} class="form-control" id="InpSurname" aria-describedby="InputName" placeholder="Enter your surname" reqiured></input>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                        </div>



                        <div class="form-group form-control is-valid">
                            <label for="InputPhone">Phone Number</label>
                            <input type="phone" ref={phoneInputRef} class="form-control" id="InputPhone" placeholder="Phone Number" required></input>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                        </div>

                        <div class="form-group form-control is-valid">
                            <label for="InputAddress">Address</label>
                            <input type="text" ref={addressInputRef} class="form-control" id="InputAddress" placeholder="Address" required></input>

                        </div>
                        {/* <label for="inputAddress">Address</label> */}
                        {/* <input type="text" class="form-control" id="inputAddress" placeholder="House Number"></input> */}
                        <div class="form-group  col-md-5 form-control is-valid">
                            <label for="inputCounty">County</label>
                            <select id="inputCounty" class="form-control">
                                <option selected>Choose...</option>
                                <option>Birmingham</option>
                                <option>London</option>
                                <option>Leeds</option>
                                <option>Manchester</option>
                                <option>Liverpool</option>
                                <option>Bristol</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div class="form-group col-md-3 form-control is-valid">
                            <label for="inputPcode">Post Code</label>
                            <input type="text" ref={postcodeInputRef} class="form-control" id="inputPcode validationCustom03" required></input>
                            <div class="invalid-feedback">
                                Please provide a postcode.
                            </div>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" required></input>
                            <label class="form-check-label" for="exampleCheck1 invalidCheck">        Agree to terms and conditions
                            </label>
                            <div class="invalid-feedback">
                                You must agree before submitting.
                            </div>
                        </div>

                        <Link className="btn btn-success" onClick={() => addR()}> Save </Link>

                        <Link to="/buyer" className="btn btn-primary"> Cancel </Link>


                    </div>




                </div>
            </form>
        </main>
    )
}
