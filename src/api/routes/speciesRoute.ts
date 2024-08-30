import express from 'express';
import {
  deleteSpecies,
  getSpecies,
  getSpeciesByArea,
  getSpeciesById,
  postSpecies,
  putSpecies,
} from '../controllers/speciesController';
import {addImageToSpecies} from '../../middlewares';

const router = express.Router();

router.route('/').post(addImageToSpecies, postSpecies).get(getSpecies);

router.route('/:id').get(getSpeciesById).put(putSpecies).delete(deleteSpecies);

router.route('/area').post(getSpeciesByArea);

export default router;
