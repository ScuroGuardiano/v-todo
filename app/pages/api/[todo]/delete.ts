import { NextApiRequest, NextApiResponse } from "next";
import sendError from "../../../api-helpers/send-error";
import { API_URL } from "../../../settings";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "DELETE") {
        return res.status(405).json({});
    }

    const todoId = req.query.todo;
    const todoRes = await fetch(`${API_URL}/todos?id=${todoId}`, {
        method: "DELETE"
    });
    if (todoRes.status !== 204) {
        return sendError(todoRes, res);
    }
    return res.status(200).json({ success: true });
}
