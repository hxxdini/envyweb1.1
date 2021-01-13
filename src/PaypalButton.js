import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import axios from "axios";
import QRCode from 'qrcode';
import firebase from './components/Firebase';
import moment from 'moment';

const db = firebase.firestore();

const CLIENT = {
  sandbox:"AW38n2NmYvRGPZh9umsVnfWnCoYJ4gU-bZM1lopoVbAmgo2pH7S1w_C6dtmK_RcyZZmPpm106MGdpPp7",
  production:"ATd4BNX_gJf377mOH1XGnbb_fwrQ4Xgj7ibMBuCxUsDKkACw9k7uUNWG69xAEr-bXjj3dXgGndOIYOqp"
};


const CLIENT_ID = process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }

  createOrder = (data, actions, ticketData, qty) => {
    return actions.order.create({
      purchase_units: [
        {
          description: +ticketData.ticketName,
          amount: {
            currency_code: ticketData.ticketCurrency,
            value: ticketData.ticketValue * qty
          }
        }
      ]
    });
  };

  onApprove = (data, actions, name, mail, tckt, qty, eventId, eventOwner, event) => {
    actions.order.capture().then(details => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID
      };
      QRCode.toDataURL(data.orderID)
      .then(url => {
        console.log(url)
        const mailData = {
          name,
          mail,
          qty,
          amountPaid: tckt.ticketValue * qty,
          currency: tckt.ticketCurrency,
          url,
          ticketName: tckt.ticketName,
          orderDate: moment().format("dddd, Do MMMM YYYY"),
          orderTime: moment().format("hh:mm:ss a"),
          orderID: paymentData.orderID
        }
        const orderRef = db.collection("Orders").doc(paymentData.orderID);
        const ticketRef = db.collection("Events").doc(eventId).collection("tickets").doc(tckt.ticketUID);
        const batch = db.batch();
        // console.log(mailData);
        batch.set(orderRef, {
          eventUID: eventId,
          eventName: event,
          eventOwner: eventOwner,
          clientFullName: name,
          clientEmailAddress: mail,
          ticketName: tckt.ticketName,
          quantityPurchased: parseInt(qty),
          orderDate: moment().format("dddd, Do MMMM YYYY"),
          orderTime: moment().format("hh:mm:ss a"),
          amountPayed: tckt.ticketValue * qty,
          delivered: false,
          currency: tckt.ticketCurrency
        });
        batch.set(ticketRef, {ticketQuantity: firebase.firestore.FieldValue.increment(-qty)}, {merge: true});
        batch.commit().then(()=> {
          axios.post("/api/orderEmail", mailData);          
        });
        // axios.post("/api/orderEmail", mailData);
      })
      .catch(err => {
        console.error(err)
      });
      console.log("Payment Approved: ", paymentData);
      this.setState({ showButtons: false, paid: true });
    });
  };

  render() {
    const { showButtons, loading, paid } = this.state;
    const { quantity, email, fullName, ticket, uid, owner, eventName } = this.props;
    return (
      <div className="main">
        {/* {loading && <Spinner />} */}

        {showButtons && (
          <div>
            <div>
              <h2>{ticket.ticketName}</h2>
              <h3>Total Checkout Amount: {ticket.ticketCurrency} {ticket.ticketValue * quantity}</h3>
            </div>

            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions, ticket, quantity)}
              onApprove={(data, actions) => this.onApprove(data, actions, fullName, email, ticket, quantity, uid, owner, eventName)}
            />
          </div>
        )}

        {paid && (
          <div className="main">
            <h2>
              Thanks for confirming your purchase.
              You will recieve your QR code and details about your order via the email provided upon validation.
              <span role="img" aria-label="emoji">
                {" "}
                😉
              </span>
            </h2>
          </div>
        )}
      </div>
    );
  }
}


export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaypalButton);
