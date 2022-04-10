import { NextApiResponse } from "next";

export default async function sendError(
  vApiResponse: Response,
  res: NextApiResponse
) {
  try {
    const data = await vApiResponse.json();
    return res.status(vApiResponse.status).json(data);
  } catch (err) {
    return res.status(vApiResponse.status).json({});
  }
}
