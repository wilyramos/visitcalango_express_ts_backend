import express from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import PlaceController from '../controllers/PlaceController';

const router = express.Router();

// Router CRUD for place turism
router.post('/create',
    body('name')
        .notEmpty()
        .withMessage('Name is required'),
    body('description')
        .notEmpty()
        .withMessage('Description is required'),
    handleInputErrors,
    PlaceController.createPlace
);



export default router