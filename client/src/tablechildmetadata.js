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
  let { listdata, type, handleClick, handleChange } = methodprops;

  let listhtml = [];
  if(listdata){
  let listdatajs = JSON.parse(JSON.stringify(listdata));

  alltypecompconsolelog("listdata", listdatajs);

  if (listdatajs) {
    for (let i = 0; i < listdatajs.length; i++) {
      listhtml.push(
        <>
          <div
            key={listdatajs[i].name}
            onClick={() =>
              handleClick({
                type: "viewdata",
                name: listdatajs[i].name,
              })
            }
          >
            {listdatajs[i].label}
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
        onClick={() => handleClick({ type: "createdata" })}
      >
        create
      </button>
      <button
        onClick={() => handleClick({ type: "deletealldata" })}
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
