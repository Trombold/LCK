import Results from "../models/Results.js";
import Valida from "../models/Validate.js";
import Championship from "../models/Championship.js";

// Función de utilidad para manejar errores
const handleError = (res, error, status = 500) => {
  console.error(error);
  res.status(status).json({ errors: [error.message] });
};

// Función de utilidad para procesar resultados
const processResults = async (results, isOpen) => {
  const processedResults = await Promise.all(
    results.map(async (result) => {
      const validate = await Valida.findById(result.id_validate);
      return validate.isOfApert === (isOpen ? "yes" : "no") ? result : null;
    })
  );
  return processedResults.filter(Boolean);
};

// Función de utilidad para calcular resultados por categoría
const calculateCategoryResults = (resultsCat, title, category) => {
  const allTables = resultsCat.flatMap(result => result.results);
  const kartNumbersSet = new Set(allTables.map(result => result.numberKart));
  const uniqueKartNumbers = Array.from(kartNumbersSet);

  const pointsTotal = uniqueKartNumbers.map(number => 
    allTables.filter(result => result.numberKart === number)
             .reduce((sum, result) => sum + result.points, 0)
  );

  const results = uniqueKartNumbers
    .map((number, index) => ({
      numberKart:number,
      points: pointsTotal[index],
      name: allTables.find(result => result.numberKart === number)?.name || "",
    }))
    .sort((a, b) => b.points - a.points)
    .map((result, index) => ({
      ...result,
      time: "-",
      placed: index + 1,
    }));

  return { title, category, results };
};

export const deleteResult = async (req, res) => {
  try {
    const result = await Results.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ errors: ["Result not found"] });
    res.json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const getActiveResults = async (req, res) => {
  try {
    const validaActive = await Valida.findOne({ open: true });
    if (!validaActive) return res.status(404).json({ errors: ["Valida not found"] });
    
    const resultsActive = await Results.find({ id_validate: validaActive._id });
    if (!resultsActive.length) return res.status(404).json({ errors: ["Results not found"] });
    
    res.json(resultsActive);
  } catch (error) {
    handleError(res, error);
  }
};

export const addResults = async (req, res) => {
  try {
    const validaActive = await Valida.findOne({ open: true });
    if (!validaActive) return res.status(404).json({ errors: ["Valida active not found"] });

    const championActive = await Championship.findOne({ open: true });
    if (!championActive) return res.status(404).json({ errors: ["Championship not found"] });

    const newResults = await Results.create({
      id_validate: validaActive._id,
      id_championship: championActive._id,
      ...req.body
    });
    res.status(200).json(newResults);
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllResults = async (req, res) => {
  try {
    const results = await Results.find();
    res.json(results);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateResult = async (req, res) => {
  try {
    const result = await Results.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) return res.status(404).json({ errors: ["Result not found"] });
    res.json(result);
  } catch (error) {
    handleError(res, error);
  }
};

const getChampionshipResults = async (req, res, isOpen) => {
  try {
    const championActive = await Championship.findOne({ open: true });
    if (!championActive) return res.status(404).json({ errors: ["Championship not found"] });

    const results = await Results.find({ id_championship: championActive._id });
    const filteredResults = await processResults(results, isOpen);

    if (!filteredResults.length) return res.status(404).json({ errors: ["Results not found"] });

    const categories = ['jr', 'x30m', 'x30s', 'open', 'parilla', 'B&S'];
    const categoryTitles = {
      jr: "Junior", x30m: "X30 Master", x30s: "X30 Senior",
      open: "Open", parilla: "Parilla", "B&S": "Briggs and Stratton"
    };

    const tables = categories.reduce((acc, category) => {
      const resultsCat = filteredResults.filter(result => result.category === category);
      const title = `Resumen de válidas de ${isOpen ? 'apertura' : 'cierre'} - ${categoryTitles[category]}`;
      acc[`table${category.toUpperCase()}`] = calculateCategoryResults(resultsCat, title, categoryTitles[category]);
      return acc;
    }, {});

    res.json(tables);
  } catch (error) {
    handleError(res, error);
  }
};

export const getResultsChampionshipOpen = (req, res) => getChampionshipResults(req, res, true);
export const getResultsChampionshipClosed = (req, res) => getChampionshipResults(req, res, false);

export const getAverageChampionshipResults = async (req, res) => {
  try {
    const championActive = await Championship.findOne({ open: true });
    if (!championActive) return res.status(404).json({ errors: ["Championship not found"] });

    const allResults = await Results.find({ id_championship: championActive._id });
    const openResults = await processResults(allResults, true);
    const closedResults = await processResults(allResults, false);

    if (!openResults.length && !closedResults.length) {
      return res.status(404).json({ errors: ["Results not found"] });
    }

    const categories = ['jr', 'x30m', 'x30s', 'open', 'parilla', 'B&S'];
    const categoryTitles = {
      jr: "Junior", x30m: "X30 Master", x30s: "X30 Senior",
      open: "Open", parilla: "Parilla", "B&S": "Briggs and Stratton"
    };

    const averageResults = categories.reduce((acc, category) => {
      const openCategoryResults = calculateCategoryResults(openResults.filter(r => r.category === category), "", "");
      const closedCategoryResults = calculateCategoryResults(closedResults.filter(r => r.category === category), "", "");
      
      const allKartNumbers = new Set([
        ...openCategoryResults.results.map(r => r.numberKart),
        ...closedCategoryResults.results.map(r => r.numberKart)
      ]);

      const combinedResults = Array.from(allKartNumbers).map(numberKart => {
        const openResult = openCategoryResults.results.find(r => r.numberKart === numberKart) || { points: 0, name: "" };
        const closedResult = closedCategoryResults.results.find(r => r.numberKart === numberKart) || { points: 0, name: "" };
        return {
          numberKart,
          points: (openResult.points + closedResult.points) / 2,
          name: openResult.name || closedResult.name,
        };
      });

      const sortedResults = combinedResults
        .sort((a, b) => b.points - a.points)
        .map((result, index) => ({ ...result, time: "-", placed: index + 1 }));

      acc[`table${category.toUpperCase()}`] = {
        title: `Resumen promedio del campeonato - ${categoryTitles[category]}`,
        category: categoryTitles[category],
        results: sortedResults
      };
      return acc;
    }, {});

    res.json(averageResults);
  } catch (error) {
    handleError(res, error);
  }
};