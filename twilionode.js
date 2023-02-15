const accountSid = 'AC6d8caef3d4194d8cfbeb2287c6425ce4'; 
const authToken = '65d4a5238e574067eb26a953ec5a023f'; 
const client = require('twilio')(accountSid, authToken); 



const sendmobilemessage = async function(req){

let resp = {issuccess:"true", message:""};

let {phonenumber, message} = req.body;
console.log(req.body);

await client.messages 
.create({ 
body: message,  
messagingServiceSid: 'MG4d433d25ea1ba7870e5cd84bc4b6746d',      
to: phonenumber 
}) 
.then(message => {
    resp.issuccess = true;
    resp.message = "message sent to"+phonenumber;
    console.log('Sent invite to ' + phonenumber + ' with SID ' + message.sid);
})
.catch(error => {
    console.log(error);
    resp.issuccess = false;
    resp.message = error;
    if(error.code == "21211"){
        resp.message = "invalid number";
    }
});
return resp;
}
module.exports ={
sendmobilemessage
}