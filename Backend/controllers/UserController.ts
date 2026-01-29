// Controllers to get all User thumbnails
import { Request, Response } from "express";
import { Thumbnail } from "../models/Thumbnail.js";

export const getUserThumbnails = async (req: Request, res: Response) => {
    try {
        const userId = req.session.userId;
        const thumbnails = await Thumbnail.find({ userId }).sort({ createdAt: -1 });
        res.json({ thumbnails });
    }
    catch (error: any) {
        console.error("Error fetching thumbnails:", error);
        res.status(500).json({ message: error.message });
    }
}

// Controller to get single thumbnail of a user
export const getThumbnailById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.session;
        const thumbnail = await Thumbnail.findOne({ userId, _id: id });
        if (!thumbnail) {
            return res.status(404).json({ message: 'Thumbnail not found' });
        }
        res.json({ thumbnail });
    }
    catch (error: any) {
        console.error("Error fetching thumbnail:", error);
        res.status(500).json({ message: error.message });
    }
}