import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js';


// https://ethereal.email/create

let nodeConfig={
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: ENV.EMAIL, // generated ethereal user
      pass: ENV.PASSWORD, // generated ethereal password
    },
}

let transporter=nodemailer.createTransport(nodeConfig);

let MailGenerator= new Mailgen({
    theme:"default",
    product:{
        name:"Mailgen",
        link: 'https:mailgen.js'
    }   
})

/**POST: http://localhost:8000/api/registerMail
 * param:{
  "username": "example123",
  "userEmail": "admin123",
  "text": "",
  "subject": "",  
 }
 */
export const registerMail=async(req,res)=>{
    const {username,userEmail,text,subject}=req.body;

    //Body of the Email
    var email={
        body:{
            name: username,
            intro: text || 'This is a test email. Thanks for choosing us.',
            outro:'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
    var emailBody=MailGenerator.generate(email);
    let message={
        from: ENV.EMAIL,
        to: userEmail,
        subject:subject|| "Signup Successful",
        html: emailBody
    }

    //Send mail
    transporter.sendMail(message)
    .then(()=>{
        return res.status(200).send({msg:"You should receive an email from us."})
    })
    .catch(error=>res.status(500).send({error}))


}