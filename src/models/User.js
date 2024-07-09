import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true  
    },
    email: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
},{
    timestamps: true,
    versionKey: false
});

// Método para encriptar la contraseña de usuario
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Método para comparar la contraseña
userSchema.statics.comparePassword = async function (password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
};

// Método para actualizar la contraseña
userSchema.statics.updatePassword = async function (userId, newPassword) {
    const encryptedPassword = await this.encryptPassword(newPassword);
    return await this.findByIdAndUpdate(userId, { password: encryptedPassword });
};

export default model('User', userSchema);
