import React, { useState, useEffect } from "react";
import AmazonLogo from "./logo.png";
import "./Checkout.css";
import { FormControl, Link, MenuItem, Select } from "@material-ui/core";
import { db } from "../Files/firebase";
import useStateValue from "../Files/StateProvider";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";

const Checkout = () => {
  const currentUser = useSelector(selectUser);
  const [countryNames, setCountryNames] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(
    JSON.parse(localStorage.getItem("visitingUserLoc"))?.country_code
  );
  const [fullName, setFullName] = useState(
    JSON.parse(localStorage.getItem("fetchedData"))?.displayName
  );
  const [addressPartOne, setAddressPartOne] = useState("");
  const [addressPartTwo, setAddressPartTwo] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [addressMarkDefault, setAddressMarkDefault] = useState(true);
  const [addressAdded, setAddressAdded] = useState(true);
  const [fetchedData, setFetchedData] = useState({});
  const [addressPresentInDatabase, setAddressPresentInDatabase] = useState(
    false
  );
  const [restMode, setRestMode] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [adding, setAddingState] = useState(false);

  const history = useHistory();

  useEffect(() => {
    db.collection("users")
      .doc(currentUser?.uid)
      .onSnapshot((doc) => {
        setFetchedData(doc.data());
        if (doc.data()?.addressAdded) {
          setAddressPresentInDatabase(doc.data()?.addressAdded);
        }
      });
  }, [currentUser]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            code: country.countryInfo.iso2,
            flagSrc: country.countryInfo.flag,
          }));

          localStorage.setItem(
            "fetchedCountriesList",
            JSON.stringify(countries)
          );
          setCountryNames(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = (selectedCountryFromList) => {
    const COUNTRY_CODE = selectedCountryFromList.target.value;
    setSelectedCountry(COUNTRY_CODE);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      fullName === "" ||
      province === "" ||
      zipCode === "" ||
      addressPartOne === "" ||
      phoneNo === ""
    ) {
      alert(
        "Some of the mendatory fields are missing, please check before submitting."
      );
    } else {
      setAddingState(true);
      await db
        .collection("users")
        .doc(currentUser?.uid)
        .set(
          {
            addressMarkedAsDefault: addressMarkDefault,
            address: {
              country: selectedCountry,
              fullName: fullName,
              addressLineOne: addressPartOne,
              addressLineTwo: addressPartTwo,
              province: province,
              city: city,
              phoneNo: phoneNo,
              zipCode: zipCode,
            },
            addressAdded: addressAdded,
          },
          { merge: true }
        );

      setAddingState(false);

      history.push("/checkout/payment-and-order-placement");
    }
  };

  const deleteAddress = () => {
    db.collection("users").doc(currentUser?.uid).set(
      {
        addressMarkedAsDefault: false,
        address: {},
        addressAdded: false,
      },
      { merge: true }
    );
    setAddressPresentInDatabase(false);
  };

  const finalizeOrderAddress = async () => {
    setProcessing(true);
    await db
      .collection("users")
      .doc(currentUser?.uid)
      .set(
        {
          firstOrderAddress: {
            country: selectedCountry,
            fullName: fullName,
            addressLineOne: addressPartOne,
            addressLineTwo: addressPartTwo,
            province: province,
            city: city,
            phoneNo: phoneNo,
            zipCode: zipCode,
          },
        },
        { merge: true }
      );

    history.push("/checkout/payment-and-order-placement");

    setProcessing(false);
  };

  const editOrderAddress = () => {
    setRestMode(false);
  };

  const buttonStatesReturner = () => {
    if (restMode) {
      return "Address added";
    } else if (adding) {
      return "Adding address";
    } else {
      return "Add this address";
    }
  };

  return (
    <div className="checkout">
      <div className="checkout__content flexColumn">
        <div className="checkout__header flexColumn">
          <div className="checkoutHeader__steps flexRow">
            <img src={AmazonLogo} alt="" />
            <div className="header__steps flexRow">
              <h3 className="passed">LOGIN</h3>
              <h3 className="active">SHIPPING ADDRESS</h3>
              <h3 className="upcoming">PAYMENT & ORDER PLACEMENT</h3>
            </div>
          </div>
          <div
            className={`checkoutHeader__addressHead ${
              addressPresentInDatabase && "checkoutHeader__addressPresentState"
            }`}
          >
            <h3>Select a shipping address</h3>
            {addressPresentInDatabase ? (
              <p>
                Is the address you'd like to use displayed below? If so, click
                the corresponding "Deliver to this address" button. Or you can
                enter a new shipping address.
              </p>
            ) : (
              <p>
                Please enter a shipping address for this order. Please also
                indicate whether your billing address is the same as the
                shipping address entered. When finished, click the "Continue"
                button. Or, if you're sending items to more than one address,
                click the "Add another address" button to enter additional
                addresses.
              </p>
            )}
          </div>
        </div>
        <div className="checkout__mainContent flexRow">
          <div className="checkout__addressArea flexColumn">
            {addressPresentInDatabase && (
              <div className="alreadyPresent__address">
                <strong>{fetchedData?.address.fullName}</strong>
                <h3>{fetchedData?.address.addressLineOne}</h3>
                <h3>
                  <span>{fetchedData?.address.addressLineTwo}</span>,
                  <span>{fetchedData?.address.zipCode}</span>
                </h3>
                <h3>
                  <span>{fetchedData?.address.city}</span>,
                  <span>{fetchedData?.address.province}</span>,
                  <span>{fetchedData?.address.country}</span>
                </h3>
                <h3>Phone: {fetchedData?.address.phoneNo}</h3>
                <div>
                  <button onClick={finalizeOrderAddress}>
                    {processing ? "Processing..." : "Deliver to this address"}
                  </button>
                  <div className="address__controls flexRow">
                    <button onClick={editOrderAddress}>Edit</button>
                    <button onClick={deleteAddress}>Remove</button>
                  </div>
                </div>
              </div>
            )}

            {/* {formState && ( */}
            <form onSubmit={submitHandler} className="address__form">
              <h3>Add a new address</h3>
              <div className="address__input">
                <label>Country/Region*</label>
                <FormControl className="checkoutCountries__dropdown">
                  <Select
                    className="checkoutCountries__select"
                    variant="outlined"
                    value={selectedCountry}
                    onChange={onCountryChange}
                  >
                    {countryNames.map((countryName) => (
                      <MenuItem className="listItem" value={countryName.code}>
                        <img
                          className="dropdown__flag"
                          src={countryName.flagSrc}
                        />
                        {countryName.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="address__input">
                <label>Full name (First and Last name)*</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder=""
                  type="text"
                />
              </div>
              <div className="address__input">
                <label>Street Address*</label>
                <input
                  value={addressPartOne}
                  onChange={(e) => setAddressPartOne(e.target.value)}
                  placeholder="Street address or P.O. Box"
                  type="text"
                />
                <input
                  value={addressPartTwo}
                  onChange={(e) => setAddressPartTwo(e.target.value)}
                  placeholder="Apt, suite, unit, building, floor, etc"
                  style={{ marginTop: "5px" }}
                  type="text"
                />
              </div>
              <div className="address__input">
                <label>City*</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder=""
                  type="text"
                />
              </div>
              <div className="address__input">
                <label>State/Province/Region*</label>
                <input
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  type="text"
                />
              </div>
              <div className="address__input">
                <label>Zip Code*</label>
                <input
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  type="text"
                />
              </div>
              <div className="address__input">
                <label>Phone No*</label>
                <input
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  type="text"
                />
              </div>
              <div className="address__inputDefault flexRow">
                <input
                  value={addressMarkDefault}
                  onChange={(e) => {
                    setAddressMarkDefault(e.target.checked);
                  }}
                  type="checkbox"
                />
                <h3>Make this my default shipping address</h3>
              </div>
              <input
                className="address__submitBtn"
                type="submit"
                value={!restMode ? "Add this Address" : "Address added"}
                value={buttonStatesReturner()}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
