import React, { Component } from "react";
// import Hero from "../components/Hero";
import PayButton from "../components/PayButton";
import Navbar from "../components/Navbar";

class Contact extends Component {

    render() {

        return (
            <>
                <Navbar />
                <PayButton amount={1000} />
            </>
        );
    }
}

export default Contact;
