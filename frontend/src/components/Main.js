import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import AddForm from "./AddForm";
function Main() {
  const [data, setData] = useState([]);

  //  updated by Harshil
  // make useState for the Edit button is Click or Not 
  const [isEdit, setIsEdit] = useState(false);

  // make useState for the getting id for the Edit

  const [ empid, setEmpid] = useState(null);


  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        console.log(response);

      });
  }, []);
  const handleDataUpdate = (responseData) => {
    setData(responseData);
  };

  const deleteemp = (id) => {
    const dbid = data[id]._id;
    fetch(`http://localhost:8000/empdelete/${dbid}`, {
      method: "DELETE",
      headers: {
        "Contenet-Type": "application/json",
      },
    }).then(() => {
      setData((preventdata) => preventdata.filter((item) => item._id !== dbid));
    });
  };

  
  
  return (
    <>
      <div className="container-fluid mainscreen">
        <div className="row">
          <div className="col-4 addform">
            <AddForm onDataUpdate={handleDataUpdate}   isEdit={isEdit} setIsEdit={setIsEdit} empid={empid} setEmpid={setEmpid} data={data} setData={setData}/>
          </div>
          <div className="col-8 cardhead">
            <div className="row ddetailheader">
              <div className="col d-flex justify-content-center align-items-center">
                <h1 className="honeeffect">EMPLOYEE DETAILS</h1>
              </div>
            </div>

            <div className="card cardborder">
              <div className="card-body">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col">EmployeeId</div>
                  <div className="col text-center">Name</div>
                  <div className="col">Department</div>
                  <div className="col text-center">Position</div>
                  <div className="col text-center">Salary</div>
                  <div className="col text-center">Actions</div>
                </div>
              </div>
            </div>
            {data.map((item, index) => {
              return (
                <>
                  <div className="card mt-1 maincard" key={index}>
                    <div className="card-body">
                      <div className="row d-flex justify-content-center align-items-center carddetail">
                        <div className="col">{item.EmployeeId}</div>
                        <div className="col text-center">{item.Name}</div>
                        <div className="col">{item.Department}</div>
                        <div className="col text-center">{item.Position}</div>
                        <div className="col text-center">{item.Salary}</div>
                        <div className="col" style={{ fontSize: "2em" }}>
                          <span
                            onClick={() => {
                            }}
                          >
                            <FaUserEdit
                              style={{
                                marginRight: "25px",
                                cursor: "pointer",
                                color: "rgb(248, 180, 10)",
                              }}

                              onClick={()=>{setIsEdit(true); setEmpid(item._id)}}
                            />
                          </span>
                          <span
                            onClick={() => {
                              deleteemp(index);
                            }}
                          >
                            <MdDeleteForever
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default Main;
