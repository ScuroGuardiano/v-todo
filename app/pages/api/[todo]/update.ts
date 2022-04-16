import { NextApiRequest, NextApiResponse } from "next";
import sendError from "../../../api-helpers/send-error";
import { API_URL } from "../../../settings";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const todo = JSON.parse(req.body);
  if (!todo.id) {
    todo.id = req.query.todo;
  }
  const updateRes = await fetch(`${API_URL}/todos`, {
    method: "PUT",
    body: JSON.stringify(todo)
  });
  if (updateRes.ok) {
    return res.status(200).json({ success: true });
  }
  return sendError(updateRes, res);
}
