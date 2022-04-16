import { NextApiRequest, NextApiResponse } from "next";
import sendError from "../../api-helpers/send-error";
import { API_URL } from "../../settings";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const createRes = await fetch(`${API_URL}/todos`, {
    method: "POST",
    body: req.body
  });
  if (createRes.status === 201) {
    const todo = await createRes.json();
    return res.status(201).json(todo);
  }
  return sendError(createRes, res);
}
