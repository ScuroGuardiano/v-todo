import { NextApiRequest, NextApiResponse } from "next";
import sendError from "../../../api-helpers/send-error";
import { Todo } from "../../../interfaces/api-dtos";
import { API_URL } from "../../../settings";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const todoId = req.query.todo;
  const todoRes = await fetch(`${API_URL}/todos/${todoId}`);
  if (todoRes.status !== 200) {
    return sendError(todoRes, res);
  }
  const todo = (await todoRes.json()) as Todo;
  todo.done = true;
  const updateRes = await fetch(`${API_URL}/todos`, {
    method: "PUT",
    body: JSON.stringify(todo),
  });
  if (updateRes.status === 200) {
    return res.status(200).json({ success: true });
  }
  return sendError(todoRes, res);
}
