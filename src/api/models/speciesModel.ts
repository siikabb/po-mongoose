import mongoose from 'mongoose';
import {Species, SpeciesModel} from '../../types/Species';
import {Polygon} from 'geojson';

const speciesSchema = new mongoose.Schema({
  species_name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
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

speciesSchema.statics.findByArea = function (
  polygon: Polygon,
): Promise<Species[]> {
  return this.find({
    location: {
      $geoWithin: {
        $geometry: {
          type: polygon.type,
          coordinates: polygon.coordinates,
        },
      },
    },
  });
};

export default mongoose.model<Species, SpeciesModel>('Species', speciesSchema);
