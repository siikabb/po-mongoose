import mongoose from 'mongoose';
import {Animal} from '../../types/Animal';

const animalSchema = new mongoose.Schema({
  animal_name: {
    type: String,
    required: true,
    minlength: 2,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  species: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

export default mongoose.model<Animal>('Animal', animalSchema);
