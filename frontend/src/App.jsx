
import React, { useState  , useEffect} from 'react'
import axios from 'axios'
export default function App() {
    let [data ,setdata]=useState([])

  let hendlesubmit=async(e)=>{
    e.preventDefault()

    let fromdata =new FormData()
    let res = e.target.fileupload.files[0]
    fromdata.append('fileupload',res)
    let shwo = await axios.post("http://localhost:5600/api/post",fromdata)
    console.log(shwo.data)
  }

  
  useEffect(()=>{
      async function getdata(){
        let Data = await axios.get("http://localhost:5600/api/get")
        setdata(Data.data)
        console.log(Data.data)
      }
    getdata()
  },[])
  return (
    <div>
        <form onSubmit={hendlesubmit}>
            <input type='file' name='fileupload'/>
            <button type='submit'>upload</button>
        </form>
        {
            data.map((item ,index)=>(
                <div key={index}>
                    <h2>images</h2>
                    <img src={`http://localhost:5600/uploads/${item.filename}`}/>
                    </div>
            ))
        }
      </div>
  )
}
