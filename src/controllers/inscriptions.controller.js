import Inscription from "../models/Inscriptions.js";
import Valida from "../models/Validate.js";
import User from "../models/User.js";
import Kart from "../models/Kart.js";
import mongoose from "mongoose";

export const addInscription = async (req, res) => {
  const { id_validate, id_user, id_karts, licencia } = req.body;

  try {
    const url_image = req.file
      ? `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
      : null;
    if (!url_image) {
      return res.status(400).json({ message: "No se proporcionó una imagen" });
    }
    const inscriptionFound = await Inscription.findOne({
      id_validate,
      id_user,
    });

    if (inscriptionFound) {
      return res.status(400).json({ errors: ["Inscription already exists"] });
    }
    const kartsList = JSON.parse(id_karts);

    if (kartsList.length === 0) {
      return res.status(400).json({ errors: ["No se encontraron karts a inscribir, seleccione almenos un kart"] });
    }
    const inscription = new Inscription({
      id_validate,
      id_user,
      id_karts:kartsList,
      url_image,
      state: "pending",
    });
    const inscriptionSave = await inscription.save();
   // const user1 = await User.findById(inscription.id_user);
  //  const res = {...inscription, licencia: user1.licencia};
    res.json(inscriptionSave);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const confirmInscription = async (req, res) => {
  const { id } = req.params;
  try {
    const inscription = await Inscription.findById(id);
    if (!inscription) {
      return res.status(404).json({ errors: ["Inscription not found"] });
    }
    inscription.state = "confirmed";
    const inscriptionSave = await inscription.save();
    res.json(inscriptionSave);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const cancelInscription = async (req, res) => {
  const { id } = req.params;
  try {
    const inscription = await Inscription.findByIdAndDelete(id);
    if (!inscription) {
      return res.status(404).json({ errors: ["Inscription not found"] });
    }
    res.json(inscription);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const getInscriptionsActives = async (req, res) => {
  try {
    const validaActive = await Valida.findOne({ open: true });

    if (!validaActive) {
      return res.status(404).json({ errors: ["Valida not found"] });
    }

    const inscriptions = await Inscription.find({
      id_validate: validaActive._id,
    });

    const data = await Promise.all(
      inscriptions.map(async (inscription) => {
        const user = await User.findById(inscription.id_user);
        const kartIds = inscription.id_karts.filter((id) =>
          mongoose.Types.ObjectId.isValid(id)
        );
        const karts = await Kart.find({
          _id: { $in: kartIds },
        });
        return {
          id: inscription._id,
          id_user: user
            ? `${user.name} ${user.lastname} 
              (${user.email})
             Licencia:${user.licencia}`
            : "Usuario no encontrado",
          id_validate: validaActive.title,
          id_karts: karts.map((k) => k.number),
          url_image: inscription.url_image,
          state: inscription.state,
        };
      })
    );

    if (data.length === 0) {
      return res.status(404).json({ errors: ["Inscription not found"] });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const getAllInscriptions = async (req, res) => {
  try {
    const inscriptions = await Inscription.find();
    res.json(inscriptions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const getOneInscription = async (req, res) => {
  const { id } = req.params;
  try {
    const inscription = await Inscription.findById(id);
    res.json(inscription);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const getInscriptionsConfirmedActives = async (req, res) => {
  try {
    const validaActive = await Valida.findOne({ open: true });

    if (!validaActive) {
      return res.status(404).json({ errors: ["Valida not found"] });
    }

    const inscriptions = await Inscription.find({
      state: "confirmed",
      id_validate,
    });
    res.json(inscriptions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const getOneInscriptionOfUserInValidateActive = async (req, res) => {
  const { id_user } = req.params;
  try {
    const validaActive = await Valida.findOne({ open: true });
    if (!validaActive) {
      return res.status(404).json({ errors: ["Valida not found"] });
    }

    const inscriptions = await Inscription.find({
      id_user,
      id_validate: validaActive._id,
    });

    if (!inscriptions) {
      return res.status(404).json({ errors: ["Inscription not found"] });
    }

    if (inscriptions.length > 1) {
      return res.status(404).json({ errors: ["Inconsistent data"] });
    }

    res.json(inscriptions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};
