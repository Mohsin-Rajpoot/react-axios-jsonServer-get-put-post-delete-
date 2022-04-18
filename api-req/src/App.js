import { useEffect, useState } from "react";
import axios from "axios";

function App() {
//states
  const [animal,setAnimal] = useState("");
  const [jsondata,setData] = useState([]);
  const[putObj,setPutObj] = useState({
     id:"",
     name:"",
     animal:"",
     city:""
  });
  const[postObj,setPosttData] = useState({
    name: "",
    animal: "",
    breed: ""
  });

//put/update or replace
  const putObject = (id,object) =>{
   
    axios.put(`http://localhost:3006/pets/${id}`, object)
        .then(() => console.log('updated'));
        requestData();
  }

//post/create or add
  const postData = () =>{
    const newObj =   JSON.stringify(postObj);
      axios.post('http://localhost:3006/pets', newObj)
  .then(function (response) {
    console.log(response);
  })
  requestData();
  }
//updating state for object to be posted 
  const setObj = (e) =>{
        setPosttData({...postObj,[e.target.name]: e.target.value});
       }

   const setputObj = (e) =>{
            setPutObj({...putObj,[e.target.name]:e.target.value});
       }
//delete
const deleteId =  (id) => {
  // axios.delete(url, { data: { foo: "bar" } });
    axios.delete(`http://localhost:3006/pets/${id}`)
       .then( () =>console.log('deleted'));
       requestData();
          }

  useEffect(()=>{
      requestData();
  },[jsondata]);

  //fetching
  const requestData = ()=>{
    //if there is no end points
    if(animal === ""){
       axios.get(`http://localhost:3006/pets`)
      .then(function (response) {
    // handle success
    setData(response.data);
      })
    }
    //if there is endpoints
    else{
         axios.get(`http://localhost:3006/pets?animal=${animal}`)
      .then(function (response) {
    // handle success
    setData(response.data);
      })
  .   catch(function (error) {
       console.log(error);
  })
    }
  }

//setting animal for api endpoint
  const handleAnimal = (e)=>{
    setAnimal(e.target.value);
  } 

  return (
    <>
    <form  onSubmit={(e) => {
          e.preventDefault();
          requestData();
        }}>
     <label>
       select api endpoint/route
       <select value={animal} onChange = {handleAnimal}>
         <option></option>
         <option >dogs</option>
         <option >birds</option>
         <option >rabbits</option>
       </select>
     </label> 
    </form>
     
       <div>
        <h4>wanna post(create) object</h4>
        <label>
         name
         <input placeholder="name" name = "name" value={postObj.name} onChange= {setObj} /> 
        </label>
        <label>
         animal
         <input placeholder="animal" name = "animal" value={postObj.animal} onChange= {setObj} /> 
        </label><label>
         breed
         <input placeholder = "breed" name = "breed" value={postObj.breed} onChange= {setObj} /> 
        </label>
        <button onClick={postData}>post</button>
      </div>


       <div>
        <h4>enter id and updated info for put(update) object</h4>
        <label>
         id
         <input placeholder="enter id" name = "id" value={putObj.id} onChange= {setputObj} /> 
        </label>
        <label>
         name
         <input placeholder="enter name" name = "name" value={putObj.name} onChange= {setputObj} /> 
        </label><label>
         animal
         <input placeholder = "animal" name = "animal" value={putObj.animal} onChange= {setputObj} /> 
        </label>
        <label>
         city
         <input placeholder = "city" name = "city" value={putObj.city} onChange= {setputObj} /> 
        </label>
        <button onClick={()=>putObject(putObj.id,putObj)}>put</button>
      </div>

     {
       jsondata.map( ({id,name,animal,city},index)=>(
           <p key={index}>{id}:  name is {name} and he is {animal} lives in {city} 
            <button onClick={()=>deleteId(id)}>delete</button> </p>
        ))
     }
      {/* <code>{JSON.stringify(jsondata)}</code> */}
  </>    
  );
}
export default App;
