'use client';

// import Input from "../components/Input";
import { Button, Input } from '@mui/joy'
import { motion } from "framer-motion"
import { useState, useEffect } from 'react'
import Layout from "../components/Layout";
import Card from "../components/Card";
import BouncingButton from "../components/BouncingButton";
import axios from "axios";
import Masonry from 'react-masonry-css'
import AnimateHeight from "react-animate-height";


const AboutPage = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [height, setHeight] = useState("100vh");
  const [loading, setLoading] = useState(false);
  const [lastSearch, setlastSearch] = useState(null);
  const [screensavers, setScreensavers] = useState(["Parenting", "Obama", "Drake", "Tractors", "Opioids", "Venture Capital", "Cancel culture", "Cardi B", "Kafka", "TED Talks"]);

  const columnsCountBreakPoints = { default: 4, 350: 1, 1100: 2, 1500: 3 }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      runRequest(query)
    }
  }

  const animation = (text) => {
    setQuery(text.toString().toLowerCase())
    runRequest(text.toString().toLowerCase(), text) 
  }


  useEffect(() => {
    // console.log("hsefsd")
  }, [data]);

  async function runRequest(event, text) {

    let search_data = ""
    if (text) {
      search_data = text
    } else {
      search_data = query
    }

    if (search_data == lastSearch) {
      return 
    }

    setLoading(true)

    var options = {
      method: 'GET',
      url: `${window.location.origin}/api/search`,
      params: { data: JSON.stringify({ query: search_data, filters: { classNum: { "$lt": 190 } } }) },
      headers: { 'Content-Type': 'application/json' }
    };

    await axios.request(options).then(async function (response) {
      await setData(response.data)
      setHeight("auto")
      setLoading(false)
      setlastSearch(search_data);
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

  }


  return (
    <Layout>
    <div className="screensaver-container">
      {screensavers.map((screensaver) => (
        <BouncingButton text={screensaver} onChangeText={function () { 
          animation(screensaver)
        }} />
      ))}
    </div>
      <AnimateHeight
        duration={500}
        height={height}
        className="min-w-screen content-center flex flex-wrap gap-2 place-content-center text-xl ">

        <div className="p-10 flex flex-wrap gap-2">

          <div className="">
            <Input
              // color="warning"
              disabled={false}
              placeholder="Search, with magic"
              size="xl"
              style={{
                "height": "100%",
                "padding": "18px"
              }}
              variant="solid"
              className="input font"
              onChange={(event) => {
                setQuery(event.target.value)
              }}
              onKeyDown={handleKeyDown}
              value={query}
            />
          </div>
          <div className="h-fit">
              {
                loading ? <Button loading className="button fontloading" onClick={function () { runRequest(query, null) }} size="xl">Search</Button> : <Button className="button font" onClick={function () { runRequest(query, null) }} size="xl">Search</Button>
              }
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
        >
          {data.map((course) => {
            return (
              <Card key={course.id} name={course.data.title} units={course.data.units} description={course.data.description} courseid={course.id} />
            )
          })}
        </Masonry>
      </div>

    </Layout >
  )
}

export default AboutPage
