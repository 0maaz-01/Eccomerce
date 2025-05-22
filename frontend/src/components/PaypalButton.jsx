import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";


const PaypalButton = () => {
  return (
         <div>
            <PayPalButtons
                style={{ shape : 'pill', layout : 'vertical', color:'blue'}}
                createSubscription={}
            />
        </div>
  )
}

export default PaypalButton