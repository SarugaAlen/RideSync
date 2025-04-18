import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../infrastructure/database/database";

interface UserAttributes {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number; 
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: string;
}

User.init({
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true,     
        primaryKey: true 
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        defaultValue: 'user'
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: true
});

export default User;
