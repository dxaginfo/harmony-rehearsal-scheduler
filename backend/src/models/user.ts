import { Model, Sequelize, DataTypes } from 'sequelize';

interface UserAttributes {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: 'admin' | 'leader' | 'member';
  createdAt: Date;
  updatedAt: Date;
}

interface UserCreationAttributes {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role?: 'admin' | 'leader' | 'member';
}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public passwordHash!: string;
  public firstName!: string;
  public lastName!: string;
  public phoneNumber!: string;
  public role!: 'admin' | 'leader' | 'member';
  public createdAt!: Date;
  public updatedAt!: Date;

  // Virtual methods
  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  User.init({
    id: {
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: dataTypes.ENUM('admin', 'leader', 'member'),
      defaultValue: 'member',
    },
    createdAt: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: dataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeSave: async (user: User) => {
        // Logic for handling pre-save actions can be placed here
        // For example, hashing a password would go here in a real app
      },
    },
  });

  return User;
};
