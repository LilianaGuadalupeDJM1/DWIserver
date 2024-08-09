import Role from '../models/Role.js';

// Crear un nuevo rol
export const createRole = async (req, res) => {
    try {
        const { name } = req.body;
        const newRole = new Role({ name });
        const roleSaved = await newRole.save();
        res.status(201).json(roleSaved);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los roles
export const getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.roleId);
        if (!role) {
            console.log('Role not found for ID:', req.params.roleId);
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        console.error('Error fetching role by ID:', error);
        res.status(500).json({ message: error.message });
    }
};


// Actualizar un rol por ID
export const updateRoleById = async (req, res) => {
    try {
        const updatedRole = await Role.findByIdAndUpdate(req.params.roleId, req.body, {
            new: true
        });
        if (!updatedRole) return res.status(404).json({ message: 'Role not found' });
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Eliminar un rol por ID
export const deleteRoleById = async (req, res) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.roleId);
        if (!deletedRole) return res.status(404).json({ message: 'Role not found' });
        res.status(200).json({ message: 'Role deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
