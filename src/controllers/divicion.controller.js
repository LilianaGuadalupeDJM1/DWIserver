import Division from '../models/Divicion.js';

// Crear una nueva división
export const createDivision = async (req, res) => {
    try {
        const newDivision = new Division(req.body);
        const savedDivision = await newDivision.save();
        res.status(201).json(savedDivision);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las divisiones
export const getDivisions = async (req, res) => {
    try {
        const divisions = await Division.find().populate('ofertasEducativas');
        res.status(200).json(divisions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Obtener una división por ID
export const getDivision = async (req, res) => {
    try {
        const division = await Division.findById(req.params.divisionId).populate('ofertasEducativas');
        if (!division) {
            return res.status(404).json({ message: 'Division no encontrada' });
        }
        res.status(200).json(division);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una división por ID
export const updateDivision = async (req, res) => {
    try {
        const updatedDivision = await Division.findByIdAndUpdate(req.params.divisionId, req.body, { new: true }).populate('ofertasEducativas');
        if (!updatedDivision) {
            return res.status(404).json({ message: 'Division no encontrada' });
        }
        res.status(200).json(updatedDivision);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una división por ID
export const deleteDivision = async (req, res) => {
    try {
        const deletedDivision = await Division.findByIdAndDelete(req.params.divisionId);
        if (!deletedDivision) {
            return res.status(404).json({ message: 'Division no encontrada' });
        }
        res.status(200).json({ message: 'Division eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};