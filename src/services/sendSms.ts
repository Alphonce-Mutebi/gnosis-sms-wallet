import dotenv from 'dotenv';
dotenv.config();

const credentials = {
    apiKey: `${process.env.AT_SANDBOX_APIKEY}`,         
    username: `${process.env.AT_SANDBOX_USERNAME}`, 
};
const Africastalking = require('africastalking')(credentials);
const sms = Africastalking.SMS

export const sendSms= async(smsData:any)=>{
    sms.send(smsData)
    .then((response: any) => {
        console.log(response);
    })
    .catch((error: any) => {
        console.log(error);
    });
}