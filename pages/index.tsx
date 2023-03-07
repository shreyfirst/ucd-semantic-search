'use client';

// import Input from "../components/Input";
import { Button, Input } from '@mui/joy'
import { motion } from "framer-motion"
import { useState, useEffect } from 'react'
import Layout from "../components/Layout";
import Card from "../components/Card";
import axios from "axios";
import Masonry from 'react-masonry-css'
import AnimateHeight from "react-animate-height";


const AboutPage = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [height, setHeight] = useState("100vh");

  const columnsCountBreakPoints = {default: 4, 350: 1, 1100: 2, 1500: 3}

  


  useEffect(() => {
      // console.log("hsefsd")
  }, [data]);

  async function runRequest(event) {

    var options = {
      method: 'GET',
      url: `${window.location.origin}/api/search`,
      params: {data:JSON.stringify({query: query, filters: {classNum: {"$lt": 190}}})},
      headers: {'Content-Type': 'application/json' }
    };
    
    await axios.request(options).then(async function (response) {
      await setData(response.data)
      setHeight("auto")
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
    
  }


  return (
    <Layout>

      <AnimateHeight
  duration={ 500 }
  height={ height }
  className="min-w-screen content-center flex flex-wrap gap-2 place-content-center text-xl ">

      <div className="p-10 flex flex-wrap gap-2">

          <div className="">
            <Input
              // color="warning"
              disabled={false}
              placeholder="Explore new possibilities"
              size="xl"
              style={{
                "height": "100%",
                "padding": "18px"
              }}
              variant="solid"
              className="input font"
              onChange={(event)=>{
                setQuery(event.target.value)
              }}
            />
          </div>
          <div className="h-fit">
            <Button className="button font" onClick={function () { runRequest(query) }} size="xl">Search</Button>
          </div>

      </div>
      </AnimateHeight>

      <div style={{
        // flex: "1 1 100%",
        // padding: "2rem",
        // "flex-direction": "row",
        display: "flex",
        // "flex-wrap": "wrap",
        "justify-content": "center",
        "width": "100vw"
        // "align-items": "flex-start",
        // gap: "1rem"
      }}>
                  
                  <Masonry breakpointCols={columnsCountBreakPoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  
                  >      {data.map((course)=>{
        return(
        <Card key={course.id} name={course.data.title} units={course.data.units} description={course.data.description} courseid={course.id}  />
      )})}
                      </Masonry>
        </div>
        
    </Layout >
  )
}

export default AboutPage
