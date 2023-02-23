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
  deleterecordNodejs,
} from "./logic";

export let Listdatahtml = (methodprops) => {
  let { listdata, columns, type, handleClick, handleChange } = methodprops;

  let listhtml = [];
  if (listdata) {
    let listdatajs = JSON.parse(JSON.stringify(listdata));

    alltypecompconsolelog("methodprops", methodprops);

    if (listdatajs) {
      for (let i = 0; i < listdatajs.length; i++) {
        let listdataitemjs = JSON.parse(JSON.stringify(listdata[i]));
        let columnhtml = [];
        if (columns && columns.length > 0) {
          for (let j = 0; j < columns.length; j++) {
            let selectedvalue = listdataitemjs[columns[j].columnname];

            let columnoptions = columns[j].columnoptions;
            alltypecompconsolelog("columnoptions", columnoptions);
            let columnoptionshtml = [];
            if (columnoptions && columnoptions.length > 0) {
              for (let k = 0; k < columnoptions.length; k++) {
                if (selectedvalue === columnoptions[k].name) {
                  selectedvalue = columnoptions[k].label;
                }
              }
            }

            columnhtml.push(
              <>
                {columns[j].columnlabel}- {selectedvalue}
              </>
            );
          }
        }

        listhtml.push(
          <>
            <div
              key={listdataitemjs.name}
              onClick={() =>
                handleClick({
                  name: "viewdata",
                  value: listdataitemjs.name,
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
  let { columns, handleClick, handleChange } = methodprops;
  let columnhtml = [];
  if (columns && columns.length > 0) {
    for (let i = 0; i < columns.length; i++) {
      let columnoptions = columns[i].columnoptions;

      let columnoptionshtml = [];
      if (columnoptions && columnoptions.length > 0) {
        for (let j = 0; j < columnoptions.length; j++) {
          columnoptionshtml.push(
            <option
              label={columnoptions[j].label}
              value={columnoptions[j].name}
            />
          );
        }
      }
      columnhtml.push(
        <>
          {columns[i].columnlabel}
          <input
            onChange={(e) =>
              handleChange({
                name: columns[i].columnname,
                value: e.target.value,
              })
            }
            list={columns[i].columnname}
          />
          <datalist id={columns[i].columnname}>{columnoptionshtml}</datalist>
        </>
      );
    }
  }
  return (
    <>
      {columnhtml}
      <button onClick={() => handleClick({ name: "createdata" })}>
        create
      </button>
      <button onClick={() => handleClick({ name: "deletealldata" })}>
        deletealldata
      </button>
    </>
  );
};

export let Viewdatahtml = (methodprops) => {
  let { viewdata, columns, buttons, handleClick, handleChange } = methodprops;
  let columnhtml = [];
  let buttonshtml = [];
  if (buttons && buttons.length > 0) {
    for (let j = 0; j < buttons.length; j++) {
      buttonshtml.push(
        <>
          <button onClick={() => handleClick({ name: buttons[j].columnname })}>
            {buttons[j].columnlabel}
          </button>
        </>
      );
    }
  }

  if (
    viewdata &&
    Object.keys(viewdata).length > 0 &&
    columns &&
    columns.length > 0
  ) {
    for (let i = 0; i < columns.length; i++) {
      let columnoptions = columns[i].columnoptions;

      let columnoptionshtml = [];
      if (columnoptions && columnoptions.length > 0) {
        for (let j = 0; j < columnoptions.length; j++) {
          columnoptionshtml.push(
            <option
              label={columnoptions[j].label}
              value={columnoptions[j].name}
            />
          );
        }
      }
      columnhtml.push(
        <>
          {columns[i].columnlabel}
          <input
            onChange={(e) =>
              handleChange({
                name: columns[i].columnname,
                value: e.target.value,
              })
            }
            defaultValue={viewdata[columns[i].columnname]}
            list={columns[i].columnname}
          />
          <datalist id={columns[i].columnname}>{columnoptionshtml}</datalist>
        </>
      );
    }
    columnhtml.push(<>{buttonshtml}</>);
  }
  return <>{columnhtml}</>;
};
