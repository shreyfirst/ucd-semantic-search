import { NextApiRequest, NextApiResponse } from 'next'
import { sampleUserData } from '../../../utils/sample-data'
import courses from '../../../courses.json';
import axios from "axios";

interface Filter {
  [key: string]: FilterOptions;
}

interface FilterOptions {
  $eq?: Number | String | Boolean;
  $ne?: Number | String | Boolean;
  $gt?: Number;
  $gte?: Number;
  $lt?: Number;
  $lte?: Number;
  $in?: String | Number;
  $nin?: String | Number;
}

async function vector(query: String) {
  const options = {
    method: 'POST',
    url: 'https://api.openai.com/v1/embeddings',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI}`,
      'Content-Type': 'application/json'
    },
    data: {input: query, model: 'text-embedding-ada-002'}
  };
  
  return axios.request(options).then(function (response: any) {
    // console.log(response.data);
    return response.data.data[0].embedding;
  }).catch(function (error: any) {
    // console.error(error);
    return error;
  });
}
async function cosine(vector: Array<number>, filter: Filter) {
  const options = {
    method: 'POST',
    url: 'https://pinecone-index-ucd-classes-98ce1f1.svc.us-east1-gcp.pinecone.io/query',
    headers: {
      'Api-Key': process.env.PINECONE,
      'Content-Type': 'application/json'
    },
    data: {
      "vector": vector,
      "topK": 30,
      "filter": filter,
      "includeMetadata": true,
      "includeValues": false,
      "namespace": "descriptions"
    }
  };
  
  return axios.request(options).then(function (response: any) {
    // console.log(response.data);
    return response.data.matches;
  }).catch(function (error: any) {
    // console.error(error);
    return error;
  });
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    
    const query_data = _req.query
    const request_data = JSON.parse(query_data["data"]);
    const vector_arr = await vector(request_data["query"]);
    const filters = request_data["filters"] || {};
    const results = await cosine(vector_arr, filters);

    let response = []

    for (let result of results) {
      response.push({
        id: result["id"],
        score: result["score"],
        data: courses[result["id"]]
      })
    }
    
    res.status(200).json(response)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
