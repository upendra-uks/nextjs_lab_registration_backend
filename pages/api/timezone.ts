import { QueryResult } from "pg";
import { NextApiRequest, NextApiResponse } from "next/types";
import { db, cors, runMiddleware } from "../../lib/db";

interface Timezone {
  id: string; // or number, depending on your API data
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  if (req.method === "OPTIONS") {
    res.status(200);
  } else if (req.method === "GET") {
    //console.log("upendra get method call provider group ");

    let rslt: QueryResult<Timezone> | null = null;

    rslt = await db.query<Timezone>(`select tz.id,tz.name,tz.abbreviation	,tz.utc_offset
            from laravel_CRUD.timezones tz`);
    
    res.status(200).json(
     rslt
    );
  } else if (req.method === "POST") {
    console.log("upendra post method call");
    let successfull = false;
   
    // console.log('everything ok')
    res.status(200).json({
      successfull: successfull,
    });
  } else if (req.method === "PUT") {
    let successfull = false;
    
    res.status(200).json({
      successfull: successfull,
    });
  } else if (req.method === "DELETE") {
    let successfull = false;
   

    res.status(200).json({
      successfull: successfull,
    });
  }
}
