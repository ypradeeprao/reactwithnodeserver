/* eslint-disable no-unused-vars */
import {
    alltypecompconsolelog,
    gettabledatafromDatabase,
    alltypecompChangeHandler,
    alltypecompClickHandler,
    getbrowserLocalstorage,
    gettabledatafromNodejs,
    createtabledataNodejs,
    insertrecordNodejs,
    updaterecordNodejs,
    deleterecordNodejs
  } from "./logic";

  
export let Listdatahtml = (methodprops) => {
  let { listdata,columns, type, handleClick, handleChange } = methodprops;

  let listhtml = [];
  if(listdata){
  let listdatajs = JSON.parse(JSON.stringify(listdata));
 
  alltypecompconsolelog("methodprops", methodprops);

  if (listdatajs) {
    for (let i = 0; i < listdatajs.length; i++) {
      let listdataitemjs = JSON.parse(JSON.stringify(listdata[i]));
      let columnhtml = [];
      if(columns && columns.length > 0){
      for(let j=0; j<columns.length; j++){
        columnhtml.push(<>
        {columns[j]}-  {listdataitemjs[columns[j]]}
         
          </>);
      }
      }

      listhtml.push(
        <>
          <div
            key={listdataitemjs.name}
            onClick={() =>
              handleClick({
                type: "viewdata",
                name: listdataitemjs.name,
              })
            }
          >
            {columnhtml}
          </div>
        </>
      );
    }
  }
}
  return <>{listhtml}</>;
};




export let Newdatahtml = (methodprops) => {
  let { columns,  handleClick, handleChange } = methodprops;
  let columnhtml = [];
  if(columns && columns.length > 0){
  for(let i=0; i<columns.length; i++){
    columnhtml.push(<>
      {columns[i]}
      <input
        onChange={(e) =>
          handleChange({ name: columns[i],  value: e.target.value })
        }
    
      />
      </>);
  }
  }
  return (
    <>
    {columnhtml}
      <button
        onClick={() => handleClick({ name: "createdata" })}
      >
        create
      </button>
      <button
        onClick={() => handleClick({ name: "deletealldata" })}
      >
        deletealldata
      </button>
    </>
  );
};




export let Viewdatahtml = (methodprops) => {
  let { viewdata, type, handleClick, handleChange } = methodprops;
  let mainpanelhtml = [];
  if (viewdata && viewdata.name && viewdata.name !== "") {
    mainpanelhtml.push(
      <>
        Label
        <input
          onChange={(e) =>
            handleChange({
              type: "label",
           
              value: e.target.value,
            })
          }
          defaultValue={viewdata.label}
        />
        Name
        <input
          onChange={(e) =>
            handleChange({ type: "name",  value: e.target.value })
          }
          defaultValue={viewdata.name}
        />
        <button onClick={() => handleClick({ type: "update" })}>
          update
        </button>
        <button
          onClick={() =>
            handleClick({ type: "delete",  name: viewdata.name })
          }
        >
          delete
        </button>
        <div></div>
      </>
    );
  }
  return <>{mainpanelhtml}</>;
};
