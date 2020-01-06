import React, { Component } from "react";
import Hero from "../components/Hero";
import ContactUs from "../components/ContactUs";

// import Banner from "../components/Banner";
// import { Link } from "react-router-dom";

class Contact extends Component {

    render() {

        return (
            <>
                <Hero >
                    <ContactUs>

                    </ContactUs>
                </Hero>
            </>
        );
    }
}

export default Contact;
