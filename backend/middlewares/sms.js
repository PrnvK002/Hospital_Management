import twilio from 'twilio';
import { TWILIO_ACCOUNT_SID , TWILIO_AUTH_TOKEN } from '../config/global.js'

let client = twilio(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN);

function sendSms(to,otp){

client.messages
  .create({
     body: `This is the messge from WeCare hospitals 
     your otp for verification is ${otp}`,
     from: '+16203180271',
     to: `+91${to}`
   })
  .then(message => console.log( 'message sent', message.sid))
  .catch((err) => { console.log(err); });

}

export default sendSms;