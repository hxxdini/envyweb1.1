// import React from "react";
// import ReactDOM from "react-dom";
// import scriptLoader from "react-async-script-loader";
// import {Helmet} from "react-helmet";
//
// class WazapayButton extends React.Component {
//   constructor(props){
//     super(props);
//   }
//   render(){
//     return [
//         (<Helmet>
//           <script type="text/javascript">
//             document.write(unescape('%3Cdiv id="wazapay-load-here"%3E%3C/div%3E%3Cscript src="' +
//             (("https:" == document.location.protocol) ? "https://wazapay.net" : "https://wazapay.net") +
//             '/static/js/merchant/widget.js" type="text/javascript"%3E%3C/script%3E'
//             ));
//           </script>
//         </Helmet>),
//       (<div id="wazapay-payment-api">
//         <button
//           id="wazapay-open-payment-modal"
//           wazapay_merchantId="WaZa409352520MC"
//           wazapay_amount="100XAF"
//           wazapay_transactionReference="23x4b3"
//         wazapay_btn="pay_now_with">
//         </button>
//       </div>)
//     ]
//   }
// }
//
// export default WazapayButton;

import React from 'react';

export const WazapayButton = () => (
  <div>
    {/* <h2>No Match</h2> */}
    <div id="wazapay-payment-api">
      <button
        id="wazapay-open-payment-modal"
        wazapay_merchantId="WaZa409352520MC"
        wazapay_amount="100XAF"
        wazapay_transactionReference="23x4b3"
      wazapay_btn="pay_now_with">
      </button>
    </div>
  </div>
)
