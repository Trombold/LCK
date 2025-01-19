import mongoose from "mongoose";
import Championship from "../models/Championship.js";

export const addChampionship = async (req, res) => {
  const { title,description, dateInit, dateEnd } =
    req.body;

  try {
    const newChampionship = await Championship.create({
      title,
      description,
      dateInit,
      dateEnd,
      open: false,
    });
    res.status(200).json(newChampionship);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const editChampionship = async (req, res) => {
  const { id } = req.params;
  const { title, dateInit, dateEnd,description } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ errors: ["Invalid ID format"] });
  }

  try {
    const updatedChampionship = await Championship.findByIdAndUpdate(
      id,
      {
        title,
        dateInit,
        description,
        dateEnd,
      },
      { new: true } //para que devuelva el documento actualizado
    );
    res.status(200).json(updatedChampionship);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const getAllChampionships = async (req, res) => {
  try {
    const Championships = await Championship.find();
    res.status(200).json(Championships);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const getOneChampionship = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ errors: ["Invalid ID format"] });
  }

  try {
    const oneChampionship = await Championship.findById(id);
    res.status(200).json(oneChampionship);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const closeOneChampionship = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ errors: ["Invalid ID format"] });
  }

  try {
    const updatedChampionship = await Championship.findByIdAndUpdate(
      id,
      {
        open: false,
      },
      { new: true } //para que devuelva el documento actualizado
    );
    res.status(200).json(updatedChampionship);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const openOneChampionship = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    
    return res.status(400).json({ errors: ["Invalid ID format"] });
  }

  try {
    // Actualizar todas las otras "Championships" a false
    await Championship.updateMany({ open: false });

    // Actualizar la "Championship" especificada a true
    const updatedChampionship = await Championship.findByIdAndUpdate(
      id,
      { open: true },
      { new: true } // para que devuelva el documento actualizado
    );

    res.status(200).json(updatedChampionship);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const deleteOneChampionship = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ errors: ["Invalid ID format"] });
  } else {
    try {
      const deletedChampionship = await Championship.findByIdAndDelete(id);
      res.status(200).json(deletedChampionship);
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: [error.message] });
    }
  } 
};
