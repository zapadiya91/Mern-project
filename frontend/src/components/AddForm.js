import { useEffect, useState } from "react";

function AddForm(props) {
  console.log(props);

  const [data, setData] = useState({
    EmployeeId: "",
    Name: "",
    Department: "",
    Position: "",
    Salary: "",
  });

  // fetch Get by Id for the edit 

  useEffect(() => {

    if (props.isEdit) {
      fetch(`http://localhost:8000/emp/${props.empid}`).then((res) => { return res.json() }).then((response) => { setData(response) }).catch((err) => { console.log(err) })
    }
  }, [props.isEdit, props.empid])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preventdetails) => ({
      ...preventdetails,
      [name]: value,
    }));
  };

  // const empid=onEdit();
  // console.log(empid)
  const addemployee = () => {

    if(props.isEdit){
      try {
        fetch("http://localhost:8000/empedit/"+props.empid, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then(()=>{
          const tempdata = props.data.map((item)=>{
            if(item._id===props.empid){
              return data;
            }
            return item;
          })
          props.setData(tempdata);
          props.setIsEdit(false);
          props.setEmpid(null);
          setData({
            EmployeeId: "",
            Name: "",
            Department: "",
            Position: "",
            Salary: "",
          })
        })
      } catch (error) {
        console.log(error);
      }
    }
    else
    {
    try {
      fetch("http://localhost:8000/empadd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        props.setData((prevdata) => [...prevdata, data]);
        setData({
          EmployeeId: "",
          Name: "",
          Department: "",
          Position: "",
          Salary: "",
        })
      });
    } catch (error) {
      console.log(error);
    }
  }
  };

  return (
    <>
      <form>
        <div className="container-fluid background vh-100">
          <div className="row formborder">
            <div className="col custom-focus-border">
              <h3 className="mb-1 text-center">Employee Form</h3>
              <div className="row">
                <div className="col">
                  <label class="form-label">EmployeeId:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="EmployeeId"
                    value={data.EmployeeId}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row d-flex align-items-center justfy-content-center">
                <div className="col">
                  <label class="form-label text-center">Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="Name"
                    value={data.Name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row d-flex align-items-center justfy-content-center">
                <div className="col">
                  <label class="form-label text-center">Department:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="Department"
                    value={data.Department}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row d-flex align-items-center justfy-content-center">
                <div className="col">
                  <label class="form-label text-center">Position:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="Position"
                    value={data.Position}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row d-flex align-items-center justfy-content-center">
                <div className="col">
                  <label class="form-label text-center">Salary:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="Salary"
                    value={data.Salary}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row d-flex align-items-center justfy-content-center mt-2">
                <div className="col d-flex justify-content-center align-items-center">

                  {props.isEdit ? <button
                    type="button"
                    className="btn btn-primary mt-1"
                    onClick={addemployee}
                  >
                    Edit Employee
                  </button>
                    :
                    <button
                      type="button"
                      className="btn btn-success mt-1"
                      onClick={addemployee}
                    >
                      Add Employee
                    </button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddForm;
