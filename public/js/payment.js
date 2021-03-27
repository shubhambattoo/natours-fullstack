/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

const stripe = Stripe(
  "pk_test_51IZVzfSBv7sGF9AzZgONXpbzRIdOPNVZggOaxZSf9X3cnGDJE743TpcIhDH5hoFdMIYzb2BUHZGzN5HPdv7HDEhr00Quzt8ehe"
);

export const bookTour = async tourId => {
  try {
    // get checkout session from api
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    // console.log(session);
    // stripe checkout charge credit card
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (error) {
    console.log(error);
    showAlert("error", error);
  }
};
