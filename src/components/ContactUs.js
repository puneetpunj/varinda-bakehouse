import React, { Component } from 'react'
// import * as emailjs from 'emailjs-com'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default class ContactUs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            mobile: null,
            comments: null
        };
    }


    handleSubmit = e => {
        e.preventDefault();
        // const { firstName, lastName, email, mobile, comments } = this.state
        // const message = `
        // Email --> ${email} 
        // Mobile --> ${mobile}
        // Detailed Message ---> 
        // ${comments}`

        // const templateParams = {
        //     from_name: `${firstName} ${lastName}`,
        //     to_name: 'Saachi Bakehouse',
        //     message_html: message,
        // }
        // emailjs.send(
        //     'gmail',
        //     'template_h4U0k9bf',
        //     templateParams,
        //     'user_N7qfEiA8YQCdo56suvAiU'
        // ).then(res => {
        //     console.log('Email successfully sent!')
        this.dialogPopup();
        this.resetForm(e)
        // }).catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    };

    dialogPopup() {
        const options = {
            message: 'Your enquiry has been submitted successfully. Our support team will contact you within 2 business days. Thanks.',
            buttons: [
                {
                    label: 'OK',
                },
            ],
            closeOnClickOutside: false,
            closeOnEscape: true,
        };
        confirmAlert(options);
    }

    resetForm = e => {
        e.target.reset();
        this.setState({
            firstName: null,
            lastName: null,
            email: null,
            mobile: null,
            comments: null,
        })
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    };

    render() {
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1 className="contacth1">Contact Us</h1>
                    <form onSubmit={this.handleSubmit}>

                        <div className="firstName">
                            <label htmlFor="firstName" className="required">First Name</label>
                            <input
                                placeholder="First Name"
                                type="text"
                                name="firstName"
                                required
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="lastName">
                            <label htmlFor="lastName" className="required">Last Name</label>
                            <input
                                placeholder="Last Name"
                                type="text"
                                name="lastName"
                                required
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input
                                placeholder="Email"
                                type="email"
                                name="email"

                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="mobile">
                            <label htmlFor="mobile" className="required">Contact Number</label>
                            <input
                                placeholder="+61"
                                type="number"
                                name="mobile"
                                required
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="textarea" >
                            <label htmlFor="textarea" className="required">Comments</label>
                            <textarea
                                placeholder="Describe what do you want to enquire about"
                                onChange={this.handleChange}
                                // required
                                name="comments"
                            />
                        </div>

                        <div className="createAccount">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div >

        )
    }
}
