import axios from 'axios';
import React, {useState} from 'react';

export let Imageupload = (props) =>{
    const [file, setFile] = useState()
    function handleChangefile(event) {
        setFile(event.target.files[0])
      }
      

      const handleSubmit2 = async (file) => {

      const file2 = document.querySelector('#myfile').files[0];
   console.log(await toBase64(file2));


        // console.log("Uploading file...");
        // const API_ENDPOINT = "http://localhost:5000/uploadFile";
        // const request = new XMLHttpRequest();
        // const formData = new FormData();
      
        // request.open("POST", API_ENDPOINT, true);
        // request.onreadystatechange = () => {
        //   if (request.readyState === 4 && request.status === 200) {
        //     console.log(request.responseText);
        //   }
        // };
        // formData.append("file", file);
        // request.send(formData);


      };

      function handleSubmit(event) {
        event.preventDefault()
        console.log(file);
        const url = '/uploadFile';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        axios.post(url, formData, config).then((response) => {
          console.log(response.data);
        });
    
      }


      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });


let handleChange = (methodprops)=>{
let {e} = methodprops;
    <Imageupload maxfilesize="200000" />
let {maxfilesize} = props;
console.log(e.target.files);
let files = e.target.files;
if(files && files.length > 0){
    for(let i=0; i<files.length; i++){
     let fileitem = files[i];
     console.log(fileitem.name);
     console.log(fileitem.size);
     console.log(fileitem.type);
     let name="";
     let size="";

     if(fileitem.type === "image/jpeg" || fileitem.type === "image/jpg"){
        name = fileitem.name;
        name = name.replace(".jpg","");
        name = name.replace(".jpeg","");
     }

     console.log(name);

     if(maxfilesize && parseInt(maxfilesize) < fileitem.size){
     alert("file size limit is "+ maxfilesize);
     }

     }
    }
}


  


    let mainpanelhtml=[];
    mainpanelhtml.push(<div style={{width:"100%"}}>


<form onSubmit={handleSubmit2}>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleChangefile}/>
          <button type="submit">Upload</button>
        </form>


        <input type="file" accept="image/*" onChange={(e)=>handleChange({e:e})} />
    
        <form action="/uploadFile" 
      enctype="multipart/form-data" method="POST">
      
        <span>Upload Profile Picture:</span>  
        <input type="file" name="mypic" required/> <br/>
        <input type="submit" value="submit" /> 
    </form>
    
    </div>);
    return mainpanelhtml;
}