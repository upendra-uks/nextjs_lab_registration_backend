import { QueryResult } from "pg";
import { NextApiRequest, NextApiResponse } from "next/types";
import { db, cors, runMiddleware } from "../../lib/db";

interface ProviderUnit {
  id: string; // or number, depending on API data
  provider_unit: string;
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

    let rslt: QueryResult<ProviderUnit> | null = null;

    rslt = await db.query<ProviderUnit>(`select pu.id,pu.provider_unit
            from laravel_CRUD.provider_units pu`);

    console.log("rslt--- provider", rslt);
    res.status(200).json(rslt);
  } else if (req.method === "POST") {
    console.log("upendra post method call");
    let successfull = false;
    try {
      console.log("Form data while save api", req);

      db.query(
        `INSERT INTO laravel_CRUD.labs (lab_name, provider_group, provider_unit) values ('${req.body.labName}', '1', '2') `
      );
      successfull = true;
    } catch (error) {
      console.error(error);
    }
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
