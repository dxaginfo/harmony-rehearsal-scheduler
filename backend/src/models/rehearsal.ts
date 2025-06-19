import { Model, Sequelize, DataTypes } from 'sequelize';

interface RehearsalAttributes {
  id: string;
  groupId: string;
  locationId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface RehearsalCreationAttributes {
  groupId: string;
  locationId?: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  createdBy: string;
}

class Rehearsal extends Model<RehearsalAttributes, RehearsalCreationAttributes> implements RehearsalAttributes {
  public id!: string;
  public groupId!: string;
  public locationId!: string;
  public title!: string;
  public description!: string;
  public startTime!: Date;
  public endTime!: Date;
  public createdBy!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Virtual methods
  public getDuration(): number {
    return (this.endTime.getTime() - this.startTime.getTime()) / (1000 * 60); // Duration in minutes
  }
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  Rehearsal.init({
    id: {
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true,
    },
    groupId: {
      type: dataTypes.UUID,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'id',
      },
    },
    locationId: {
      type: dataTypes.UUID,
      allowNull: true,
      references: {
        model: 'locations',
        key: 'id',
      },
    },
    title: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: dataTypes.TEXT,
      allowNull: true,
    },
    startTime: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: dataTypes.DATE,
      allowNull: false,
      validate: {
        isAfterStartTime(value: Date) {
          if (value <= this.startTime) {
            throw new Error('End time must be after start time');
          }
        },
      },
    },
    createdBy: {
      type: dataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
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
    modelName: 'Rehearsal',
    tableName: 'rehearsals',
    timestamps: true,
  });

  return Rehearsal;
};
