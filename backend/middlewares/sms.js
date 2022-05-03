
import twilio from 'twilio';
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC0d871c77995f0cdeee8da13b141be9df';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'c26cbabd71eeb7ef495c6f0476866bdb' ;

let client = twilio(accountSid,authToken);

function sendSms(to,otp){

client.messages
  .create({
     body: `This is the messge from WeCare hospitals 
     your otp for verification is ${otp}`,
     from: '+16203180271',
     to: to
   })
  .then(message => console.log( 'message sent', message.sid));

}

export default sendSms;