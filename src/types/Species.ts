import {Point, Polygon} from 'geojson';
import mongoose, {Model} from 'mongoose';
import {Category} from './Category';

type Species = {
  species_name: string;
  image: string;
  category: mongoose.Types.ObjectId | Category;
  location: Point;
};

type SpeciesModel = Model<Species> & {
  findByArea: (polygon: Polygon) => Promise<Species[]>;
};

export {Species, SpeciesModel};
