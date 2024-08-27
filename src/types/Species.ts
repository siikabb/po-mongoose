import {Point} from 'geojson';
import mongoose from 'mongoose';

type Species = {
  species_name: string;
  image: string;
  category: mongoose.Types.ObjectId;
  location: Point;
};

export {Species};
