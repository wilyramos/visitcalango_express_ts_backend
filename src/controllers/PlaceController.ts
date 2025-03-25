import Place from "../models/Place";
import { Request, Response } from "express";



export class PlaceController {

    static createPlace = async (req: Request, res: Response) => {
        const { name, description, image, location } = req.body;
        try {
            const place = new Place({
                name,
                description,
                image,
                location
            });

            await place.save();

            res.status(201).json("Place created successfully");

        } catch (error) {
            console.log(error);
            res.status(500).json("Internal server error");
        }
    }



}   

export default PlaceController;
