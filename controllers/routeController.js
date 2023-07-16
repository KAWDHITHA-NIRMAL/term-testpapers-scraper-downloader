import Response from '../models/response.js';
import { scrape_uris } from './scrape.js';

const urlController = async (req, res) => {
  let response;

  if (!req.params.grade) {
    response = new Response(400, 'grade is missing', []);
    return res.status(response.status).json(response);
  }

  if (!req.params.subject) {
    response = new Response(400, 'subject is missing', []);
    return res.status(response.status).json(response);
  }

  const data = await scrape_uris(req.params.grade, req.params.subject);
  if (data.length<1) {
    response = new Response(404, 'requested data not found!', data);
    return res.status(response.status).json(response);
  }
  response = new Response(200, 'data fetched successfully.', data);
  return res.status(response.status).json(response);
};

const mainController = (req, res) => {
  const response = new Response(200, 'api is working!', []);
  return res.status(response.status).json(response);
};

export { urlController, mainController };
