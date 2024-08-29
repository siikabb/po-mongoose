import express from 'express';
import {
  deleteAnimal,
  getAnimal,
  getAnimals,
  getAnimalsByBox,
  postAnimal,
  putAnimal,
  getBySpecies,
} from '../controllers/animalController';

const router = express.Router();

router.route('/').post(postAnimal).get(getAnimals);

router.route('/location').get(getAnimalsByBox);

router.route('/species/:species').get(getBySpecies);

router.route('/:id').get(getAnimal).put(putAnimal).delete(deleteAnimal);

export default router;
