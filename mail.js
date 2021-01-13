import { createTransport } from "nodemailer";
import { Hello } from "./hello_template";
import { Thanks } from "./thanks_template";

const getEmailData = (orderDetails, template) => {
    let data = null;

    switch (template) {
        case "hello":
            data = {
                from: "Hoodini <blackhxxdini@gmail.com>",
                to: orderDetails.mail,
                subject: `Hello ${orderDetails.name}`,
                html: Hello()
            }
            break;

        case "thanks":
            data = {
                from: "Hoodini <blackhxxdini@gmail.com>",
                to: orderDetails.mail,
                subject: `Thanks for your purchase ${orderDetails.name}`,
                html: Thanks(orderDetails.name, orderDetails.url, orderDetails.orderID, orderDetails.ticketName, orderDetails.orderDate, orderDetails.amountPaid, orderDetails.currency, orderDetails.qty)
            }
            break;
        default:
    }
    return data;
}


export const sendEmail = (orderDetails, type) => {

    // const transport = {
    //     //all of the configuration for making a site send an email.
      
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //       user: "blackhxxdini@gmail.com",
    //       pass: "psalms1914"
    //     }
    //   };
      

    const smtpTransport = createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "24a411cb3f5900",
            pass: "2b78eab080e46d"
        }
    });

    const mail = getEmailData(orderDetails, type)

    smtpTransport.sendMail(mail, function(error, response) {
        console.log("sendmail breakpoint");
        if(error) {
            console.log(error)
        } else {
            console.log( " email sent successfully")
        }
        smtpTransport.close();
    })


}

// export default { sendEmail }

// module.exports = { sendEmail }
