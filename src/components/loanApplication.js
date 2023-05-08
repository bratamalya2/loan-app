import React, { useState, useEffect, useCallback } from "react";
import base64 from "base-64";
import "../styles/loanApplication.css";

function LoanApplication({ loanAmount, interestRate, processingFee, months }) {
  const [stateArr, setStateArr] = useState([]);
  const [cityArr, setCityArr] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [pin, setPin] = useState("");
  const [pan, setPan] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [aadharFront, setAadharFront] = useState("");
  const [aadharBack, setAadharBack] = useState("");
  const [showForm, setShowForm] = useState("block");
  const [showSuccessText, setShowSuccessText] = useState("none");

  const getAllStates = async () => {
    const url = "https://livedemoproject.com/instant-loan/api/states";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const objArr = (await response.json()).data;
    setStateArr(objArr.map((obj) => ({ id: obj.id, state: obj.state })));
  };

  const getAllCities = useCallback(async () => {
    if (!selectedStateId) return;
    const url = "https://livedemoproject.com/instant-loan/api/city";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        state_id: selectedStateId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const objArr = (await response.json()).data;
    setCityArr(objArr.map((obj) => ({ id: obj.id, city_name: obj.city_name })));
  }, [selectedStateId]);

  const submitForm = async () => {
    try {
      const url = "https://livedemoproject.com/instant-loan/api/loan-submit";
      if (
        stateArr.length &&
        cityArr.length &&
        firstName.length &&
        lastName.length &&
        email.length &&
        phone.length &&
        address.length &&
        gender.length &&
        pin.length &&
        pan.length &&
        ifsc.length &&
        accNumber.length &&
        selectedStateId !== null &&
        selectedCityId !== null &&
        aadharFront.length &&
        aadharBack.length
      ) {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
            pin_code: pin,
            pan_card: pan,
            ifsc_code: ifsc,
            account_number: accNumber,
            duration: months,
            loan_amount: loanAmount,
            aadhar_card_front: aadharFront,
            aadhar_card_back: aadharBack,
            state_id: selectedStateId,
            city_id: selectedCityId,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const objArr = await response.json();
        if (objArr.success) {
          setShowForm("none");
          setShowSuccessText("block");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllStates();
  }, []);

  useEffect(() => {
    getAllCities();
  }, [selectedStateId, getAllCities]);

  return (
    <div>
      <p className="info-bold">Loan Summary</p>
      <p
        className="info-bold"
        style={{ display: showSuccessText, color: "green" }}
      >
        Your loan application is being proccessed. It will be dispatched within
        an hour
      </p>
      <div className="loan-info-table">
        <table>
          <tbody>
            <tr>
              <td>
                <p className="info-bold">{loanAmount}</p>
                <p className="info-light">Loan Amount</p>
              </td>
              <td>
                <p className="info-bold">{interestRate}% Flat</p>
                <p className="info-light">Interest Rate</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="info-bold">Rs. {processingFee}</p>
                <p className="info-light">Processing Fees</p>
              </td>
              <td>
                <p className="info-bold">{months}</p>
                <p className="info-light">Months</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="info-bold" style={{ display: showForm }}>
        Easy Business Loan
      </p>
      <p className="info-light" style={{ display: showForm }}>
        Provide the details below to get started with your business check
        eligibility application
      </p>
      <div className="loan-form" style={{ display: showForm }}>
        <div>
          <div>
            <label htmlFor="fname" className="info-bold">
              First Name
            </label>
          </div>
          <input
            id="fname"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor="lname" className="info-bold">
              Last Name
            </label>
          </div>
          <input
            id="lname"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor="phoneNo" className="info-bold">
              Phone Number
            </label>
          </div>
          <input
            id="phoneNo"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor="address" className="info-bold">
              Address
            </label>
          </div>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor="gender" className="info-bold">
              Gender
            </label>
          </div>
          <select
            id="gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <div>
            <label htmlFor="email" className="info-bold">
              Email
            </label>
          </div>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor="state" className="info-bold">
              State
            </label>
          </div>
          <select
            id="state"
            onChange={(e) => setSelectedStateId(e.target.value)}
          >
            <option key="-1"></option>
            {stateArr.map((obj) => (
              <option key={obj.id} value={obj.id}>
                {obj.state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div>
            <label htmlFor="city" className="info-bold">
              City
            </label>
          </div>
          <select id="city" onChange={(e) => setSelectedCityId(e.target.value)}>
            <option key="-1"></option>
            {cityArr.map((obj) => (
              <option key={obj.id} value={obj.id}>
                {obj.city_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div>
            <label htmlFor="pin" className="info-bold">
              PIN
            </label>
          </div>
          <input
            id="pin"
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor="pan" className="info-bold">
              PAN
            </label>
          </div>
          <input
            id="pan"
            type="text"
            value={pan}
            onChange={(e) => setPan(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor="ifsc-code" className="info-bold">
              IFSC Code
            </label>
          </div>
          <input
            id="ifsc-code"
            type="text"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor="ac-no" className="info-bold">
              Account Number
            </label>
          </div>
          <input
            id="ac-no"
            type="text"
            value={accNumber}
            onChange={(e) => setAccNumber(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label htmlFor="aadhar-front" className="info-bold">
              Aadhar Card Front
            </label>
          </div>
          <input
            id="aadhar-front"
            type="file"
            accept="image/*"
            onInput={(e) => {
              setAadharFront(base64.encode(e.target.value));
            }}
          />
        </div>
        <div>
          <div>
            <label htmlFor="aadhar-back" className="info-bold">
              Aadhar Card Back
            </label>
          </div>
          <input
            id="aadhar-back"
            type="file"
            accept="image/*"
            onInput={(e) => setAadharBack(e.target.value)}
          />
        </div>
        <button onClick={submitForm}>Pay Now</button>
      </div>
    </div>
  );
}

export default LoanApplication;
