import User from '../models/User.js';
import mongoose from 'mongoose';
import Role from "../models/Role.js";


// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Obtener un usuario por su ID
export const getUsuarioById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.usuarioId)) {
            return res.status(400).json({ message: 'ID de usuario inválido' });
        }

        const usuario = await User.findById(req.params.usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'El ID no corresponde a ningún usuario' });
        }
        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}





// Actualizar usuario
export const updateUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const { username, password, email, roles } = req.body;

        // Verificar si se proporciona una contraseña y encriptarla si es necesario
        let hashedPassword = password;
        if (password) {
            hashedPassword = await User.encryptPassword(password);
        }

        // Convertir los roles a ObjectId y verificar si existen en la base de datos
        let rolesObjectId = [];
        if (roles && roles.length > 0) {
            const existingRoles = await Role.find({ name: { $in: roles } });
            if (existingRoles.length !== roles.length) {
                return res.status(400).json({ message: 'Uno o más roles no existen' });
            }
            rolesObjectId = existingRoles.map(role => role.id);
        }

        // Actualizar el usuario
        const updatedUsuario = await User.findByIdAndUpdate(
            usuarioId,
            { username, password: hashedPassword, email, roles: rolesObjectId },
            { new: true }
        );

        if (!updatedUsuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario actualizado correctamente', user: updatedUsuario });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};




// Eliminar un usuario por su ID
export const deleteUsuario = async (req, res) => {
    try {
        const deletedUsuario = await User.findByIdAndDelete(req.params.usuarioId);
        if (!deletedUsuario) {
            return res.status(404).json({ message: 'usuario no encontrado' });
        }
        res.json({ message: 'usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}
