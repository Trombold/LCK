import mongoose from "mongoose";
import Valida from "../models/Validate.js";
import Championship from "../models/Championship.js";

export const addValida = async (req, res) => {
  const { title, indications, dateInit, timeInit, dateEnd, isOfApert } =
    req.body;

  try {
    const championActive = await Championship.findOne({ open: true });
    if (!championActive) {
      return res
        .status(400)
        .json({ errors: ["No hay campeonato activo"] });
    }

    const newValida = await Valida.create({
      id_championship: championActive._id,
      title,
      indications,
      dateInit,
      timeInit,
      dateEnd,
      isOfApert,
      open: false,
    });
    res.status(200).json(newValida);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const editValida = async (req, res) => {
  const { id } = req.params;
  const { title, indications, description, dateInit, timeInit, dateEnd,isOfApert } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ errors: ["Invalid ID format"] });
  }

  try {
    const updatedValida = await Valida.findByIdAndUpdate(
      id,
      {
        title,
        indications,
        description,
        dateInit,
        timeInit,
        dateEnd,
        isOfApert
      },
      { new: true } //para que devuelva el documento actualizado
    );
    res.status(200).json(updatedValida);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const getAllValidas = async (req, res) => {
  try {
    const validas = await Valida.find();
    res.status(200).json(validas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const getOneValida = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ errors: ["Invalid ID format"] });
  }

  try {
    const oneValida = await Valida.findById(id);
    res.status(200).json(oneValida);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const closeOneValida = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ errors: ["Invalid ID format"] });
  }

  try {
    const updatedValida = await Valida.findByIdAndUpdate(
      id,
      {
        open: false,
      },
      { new: true } //para que devuelva el documento actualizado
    );
    res.status(200).json(updatedValida);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const openOneValida = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    
    return res.status(400).json({ errors: ["Invalid ID format"] });
  }

  try {
    // Actualizar todas las otras "Validas" a false
    await Valida.updateMany({ open: false });

    // Actualizar la "Valida" especificada a true
    const updatedValida = await Valida.findByIdAndUpdate(
      id,
      { open: true },
      { new: true } // para que devuelva el documento actualizado
    );

    res.status(200).json(updatedValida);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const getValidaActive = async (req, res) => {
  try {
    const validaActive = await Valida.find({ open: true });
    if (!validaActive) {
      return res.status(404).json({ errors: ["Valida not found"] });
    }
    res.status(200).json(validaActive);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const deleteOneValida = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ errors: ["Invalid ID format"] });
  } else {
    try {
      const deletedValida = await Valida.findByIdAndDelete(id);
      res.status(200).json(deletedValida);
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: [error.message] });
    }
  } 
};
