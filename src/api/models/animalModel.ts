import mongoose from 'mongoose';
import {Animal, AnimalModel} from '../../types/Animal';

const animalSchema = new mongoose.Schema({
  animal_name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  birthdate: {
    type: Date,
    required: true,
    max: Date.now(),
  },
  species: {
    type: mongoose.Types.ObjectId,
    ref: 'Species',
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

animalSchema.statics.findBySpecies = function (
  species_name: string,
): Promise<Animal[]> {
  return this.aggregate([
    {
      $lookup: {
        from: 'species',
        localField: 'species',
        foreignField: '_id',
        as: 'species',
      },
    },
    {
      $match: {
        'species.species_name': species_name,
      },
    },
  ]);
};

export default mongoose.model<Animal, AnimalModel>('Animal', animalSchema);
