import Kart from "../models/Kart.js";
import Valida from "../models/Validate.js";
import Inscription from "../models/Inscriptions.js";
import User from "../models/User.js";
export const allKarts = async (req, res) => {
  const { email } = req.params;
  const emailUser = email;
  try {
    if (!emailUser)
      return res.status(401).json({ errors: ["Datos incompletos"] });

    const karts = await Kart.find({ emailUser });
    res.status(200).json(karts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const addKart = async (req, res) => {
  const { category, number, haveTransponder, emailUser } = req.body;

  try {
    let errorMessage = "";

    switch (category) {
      case "jr":
        if (number <= 600 || number >= 699) {
          errorMessage =
            "El número de kart para la categoría Junior debe estar entre 600 y 699";
        }
        break;
      case "x30m":
        if (number <= 100 || number >= 199) {
          errorMessage =
            "El número de kart para la categoría X30 Master debe estar entre 100 y 199";
        }
        break;
      case "x30s":
        if (number <= 200 || number >= 299) {
          errorMessage =
            "El número de kart para la categoría X30 Senior debe estar entre 200 y 299";
        }
        break;
      case "open":
        if (number <= 700 || number >= 799) {
          errorMessage =
            "El número de kart para la categoría Open debe estar entre 700 y 799";
        }
        break;
      case "parilla":
        if (number <= 400 || number >= 499) {
          errorMessage =
            "El número de kart para la categoría Parilla debe estar entre 400 y 499";
        }
      case "B&S":
        if (number <= 300 || number >= 399) {
          errorMessage =
            "El número de kart para la categoría B&S debe estar entre 500 y 599";
        }
        break;
      default:
        errorMessage = "Categoría no válida";
    }

    if (errorMessage) {
      return res.status(400).json({ errors: [errorMessage] });
    }

    const numberKartExist = await Kart.findOne({ number });
    if (numberKartExist) {
      return res.status(400).json({ errors: ["El número de kart ya existe"] });
    }

    const newKart = await Kart.create({
      category,
      number,
      haveTransponder,
      emailUser,
    });

    res.status(201).json(newKart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const oneKart = async (req, res) => {
  const { id } = req.params;
  try {
    const oneKart = await Kart.findById(id);
    res.status(200).json(oneKart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const updateKart = async (req, res) => {
  const { id } = req.params;
  const { category, number, haveTransponder } = req.body;

  try {
    let errorMessage = "";

    switch (category) {
      case "jr":
        if (number <= 600 || number >= 699) {
          errorMessage =
            "El número de kart para la categoría Junior debe estar entre 600 y 699";
        }
        break;
      case "x30m":
        if (number <= 100 || number >= 199) {
          errorMessage =
            "El número de kart para la categoría X30 Master debe estar entre 100 y 199";
        }
        break;
      case "x30s":
        if (number <= 200 || number >= 299) {
          errorMessage =
            "El número de kart para la categoría X30 Senior debe estar entre 200 y 299";
        }
        break;
      case "open":
        if (number <= 700 || number >= 799) {
          errorMessage =
            "El número de kart para la categoría Open debe estar entre 700 y 799";
        }
        break;
      case "parilla":
        if (number <= 400 || number >= 499) {
          errorMessage =
            "El número de kart para la categoría Parilla debe estar entre 400 y 499";
        }
      case "B&S":
        if (number <= 300 || number >= 399) {
          errorMessage =
            "El número de kart para la categoría B&S debe estar entre 500 y 599";
        }
        break;
      default:
        errorMessage = "Categoría no válida";
    }

    if (errorMessage) {
      return res.status(400).json({ errors: [errorMessage] });
    }

    const numberKartExist = await Kart.findOne({ number });
    if (numberKartExist && numberKartExist._id.toString() !== id) {
      return res.status(400).json({ errors: ["El número de kart ya existe"] });
    }

    const updatedKart = await Kart.findByIdAndUpdate(
      id,
      { category, number, haveTransponder },
      { new: true }
    );

    if (!updatedKart) {
      return res.status(404).json({ errors: ["Kart no encontrado"] });
    }

    res.status(200).json(updatedKart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const deleteKart = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedKart = await Kart.findByIdAndDelete(id);
    res.status(200).json(deletedKart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const getKartsInscribedToValidate = async (req, res) => {
  try {
    const validateActive = await Valida.findOne({ open: true });
    if (!validateActive) {
      return res.status(404).json({ errors: ["Valida not found"] });
    }

    const inscriptions = await Inscription.find({
      id_validate: validateActive._id,
      state: "confirmed",
    });

    const kartsSearch = [];
    for (let i = 0; i < inscriptions.length; i++) {
      for (let j = 0; j < inscriptions[i].id_karts.length; j++) {
        kartsSearch.push(inscriptions[i].id_karts[j]);
      }
    }

    const kartsResponse = [];
    for (let i = 0; i < kartsSearch.length; i++) {
      const kart = await Kart.findById(kartsSearch[i]);
      const user = await User.findOne({ email: kart.emailUser });

      if (!user) {
        return res.status(404).json({ errors: ["User not found"] });
      }
      kartsResponse.push({
        id: kart._id,
        number: kart.number,
        category: kart.category,
        name: `${user.name} ${user.lastname}`,
        haveTransponder: kart.haveTransponder,
        nameTransponder: kart.nameTransponder,
      });
    }
    res.json(kartsResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};

export const patchNameTransponderKart = async (req, res) => {
  const { id } = req.params;
  const { nameTransponder } = req.body;
  try {
    const updatedKart = await Kart.findByIdAndUpdate(
      id,
      { nameTransponder },
      { new: true }
    );
    if (!updatedKart) {
      return res.status(404).json({ errors: ["Kart not found"] });
    }
    res.status(200).json(updatedKart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error.message] });
  }
};