import {NextFunction, Request, Response} from 'express';
import {Species} from '../../types/Species';
import {MessageResponse} from '../../types/Messages';
import SpeciesModel from '../models/speciesModel';
import CustomError from '../../classes/CustomError';

type DBMessageResponse = MessageResponse & {
  data: Species | Species[];
};

const postSpecies = async (
  req: Request<{}, {}, Species>,
  res: Response<DBMessageResponse>,
  next: NextFunction,
) => {
  try {
    const newSpecies = new SpeciesModel(req.body);
    const savedSpecies = await newSpecies.save();

    res.status(201).json({
      message: 'Species created successfully',
      data: savedSpecies,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const getSpecies = async (
  req: Request,
  res: Response<Species[]>,
  next: NextFunction,
) => {
  try {
    const species = await SpeciesModel.find();

    res.json(species);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const getSpeciesById = async (
  req: Request<{id: string}>,
  res: Response<Species>,
  next: NextFunction,
) => {
  try {
    const species = await SpeciesModel.findById(req.params.id);

    if (!species) {
      return next(new CustomError('Species not found', 404));
    }

    res.json(species);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const putSpecies = async (
  req: Request<{id: string}, {}, Species>,
  res: Response<DBMessageResponse>,
  next: NextFunction,
) => {
  try {
    const updatedSpecies = await SpeciesModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
    );

    if (!updatedSpecies) {
      return next(new CustomError('Species not found', 404));
    }

    res.json({
      message: 'Species updated successfully',
      data: updatedSpecies,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const deleteSpecies = async (
  req: Request<{id: string}>,
  res: Response<DBMessageResponse>,
  next: NextFunction,
) => {
  try {
    const deletedSpecies = await SpeciesModel.findByIdAndDelete(req.params.id);

    if (!deletedSpecies) {
      return next(new CustomError('Species not found', 404));
    }

    res.json({
      message: 'Species deleted successfully',
      data: deletedSpecies,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export {postSpecies, getSpecies, getSpeciesById, putSpecies, deleteSpecies};
