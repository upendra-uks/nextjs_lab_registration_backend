import { QueryResult } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next/types';
import {db, cors, runMiddleware} from '../../lib/db';

interface User {
  id: number;
  name: string;
  email: string;
}

interface SeatRslt{
  seat_id: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);
  if (req.method === 'OPTIONS') {
    res.status(200)
  } else if (req.method === 'GET') {
    console.log('upendra get method call 1pppppppppppppppppppppppppp');
    
  } else if (req.method === 'POST') {
    console.log('upendra post method call');
    let successfull = false;
    try{
      console.log('Form data while save api',req);
           
      db.query(`INSERT INTO laravel_CRUD.labs (lab_name, provider_group, provider_unit,address,state,city,zip_code,office_phone,mobile,email,time_zone) 
        values ('${req.body.labName}', '${req.body.providerGroup}', '${req.body.providerUnit}', '${req.body.address}','${req.body.state}','${req.body.city}','${req.body.zipCode}','${req.body.officePhone}','${req.body.mobile}' ,'${req.body.email}','${req.body.timeZone}') `);
      successfull = true;

    } catch (error) {
      console.error(error);
    }
    // console.log('everything ok')
    res.status(200).json({
      successfull: successfull
    });
  } else if (req.method === 'PUT') {
    let successfull = false;
    try{
       successfull = true;

    } catch (error) {
      console.error(error);
    }

    res.status(200).json({
      successfull: successfull
    });
  } else if (req.method === 'DELETE') {
    let successfull = false;
    
    res.status(200).json({
      successfull: successfull
    });
  }
}
