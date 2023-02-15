let key = '483871a024c5afd4443e8493e1a15641';
let url = "https://api.imgbb.com/1/upload?expiration=10&key="+key;


const getpostrequestjson = async function(req){
    let resp = {issuccess:"true", message:"", data:""};
  
    var data = JSON.stringify({
        "image": "samplelocalurl",
    });

    let config = {
        method: 'post',
        url: url,
        headers: {
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
          'key': key,
        },
        data: data
    };

  
   
        resp.issuccess = true;
        resp.data = config;
        resp.message = '';
    



      return resp;
  }





module.exports ={
    getpostrequestjson
}



