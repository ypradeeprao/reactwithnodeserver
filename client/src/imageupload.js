export let Imageupload = (props) =>{


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
        <input type="file" accept="image/*" onChange={(e)=>handleChange({e:e})} />
    </div>);
    return mainpanelhtml;
}