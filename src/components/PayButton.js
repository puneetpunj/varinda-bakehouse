import PropTypes from 'prop-types';
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { handler } from '../lambda/stripe-local'

import config from '../config';

class PayButton extends React.Component {
    constructor(props) {
        super(props);
        this.onToken = this.onToken.bind(this);
    }

    async onToken(token) { // On a successful tokenization request,

        const tokenBody = {
            body: JSON.stringify({
                token,
                charge: {
                    amount: this.props.amount,
                    currency: config.stripe.currency,
                },
            }),
        }

        const res = await handler(tokenBody)
        console.log(res);
    }

    render() {
        return (
            <StripeCheckout
                name="Serverless Stripe Store Inc."
                token={this.onToken}
                amount={this.props.amount}
                currency={config.stripe.currency}
                stripeKey={config.stripe.apiKey} // Stripe publishable API Key
                allowRememberMe={false}
            />
        );
    }
}

PayButton.propTypes = {
    amount: PropTypes.number.isRequired,
};

export default PayButton;