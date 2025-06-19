import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/db';

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env as keyof typeof dbConfig];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: config.logging,
    pool: config.pool,
    define: config.define,
  }
);

// Import models
import UserModel from './user';
import GroupModel from './group';
import MembershipModel from './membership';
import AvailabilityModel from './availability';
import RehearsalModel from './rehearsal';
import AttendanceModel from './attendance';
import LocationModel from './location';
import ResourceModel from './resource';
import RehearsalResourceModel from './rehearsalResource';
import NotificationModel from './notification';
import UserSettingModel from './userSetting';

// Initialize models
const User = UserModel(sequelize, DataTypes);
const Group = GroupModel(sequelize, DataTypes);
const Membership = MembershipModel(sequelize, DataTypes);
const Availability = AvailabilityModel(sequelize, DataTypes);
const Rehearsal = RehearsalModel(sequelize, DataTypes);
const Attendance = AttendanceModel(sequelize, DataTypes);
const Location = LocationModel(sequelize, DataTypes);
const Resource = ResourceModel(sequelize, DataTypes);
const RehearsalResource = RehearsalResourceModel(sequelize, DataTypes);
const Notification = NotificationModel(sequelize, DataTypes);
const UserSetting = UserSettingModel(sequelize, DataTypes);

// Define associations

// User associations
User.hasMany(Membership, { foreignKey: 'userId' });
User.hasMany(Availability, { foreignKey: 'userId' });
User.hasMany(Attendance, { foreignKey: 'userId' });
User.hasMany(Notification, { foreignKey: 'userId' });
User.hasOne(UserSetting, { foreignKey: 'userId' });
User.hasMany(Rehearsal, { foreignKey: 'createdBy', as: 'createdRehearsals' });

// Group associations
Group.hasMany(Membership, { foreignKey: 'groupId' });
Group.hasMany(Rehearsal, { foreignKey: 'groupId' });
Group.belongsTo(User, { foreignKey: 'createdBy' });

// Membership associations
Membership.belongsTo(User, { foreignKey: 'userId' });
Membership.belongsTo(Group, { foreignKey: 'groupId' });

// Availability associations
Availability.belongsTo(User, { foreignKey: 'userId' });

// Rehearsal associations
Rehearsal.belongsTo(Group, { foreignKey: 'groupId' });
Rehearsal.belongsTo(Location, { foreignKey: 'locationId' });
Rehearsal.belongsTo(User, { foreignKey: 'createdBy' });
Rehearsal.hasMany(Attendance, { foreignKey: 'rehearsalId' });
Rehearsal.hasMany(RehearsalResource, { foreignKey: 'rehearsalId' });

// Attendance associations
Attendance.belongsTo(Rehearsal, { foreignKey: 'rehearsalId' });
Attendance.belongsTo(User, { foreignKey: 'userId' });

// Location associations
Location.hasMany(Rehearsal, { foreignKey: 'locationId' });

// Resource associations
Resource.hasMany(RehearsalResource, { foreignKey: 'resourceId' });
Resource.belongsTo(Location, { foreignKey: 'locationId' });

// RehearsalResource associations
RehearsalResource.belongsTo(Rehearsal, { foreignKey: 'rehearsalId' });
RehearsalResource.belongsTo(Resource, { foreignKey: 'resourceId' });

// Notification associations
Notification.belongsTo(User, { foreignKey: 'userId' });

// UserSetting associations
UserSetting.belongsTo(User, { foreignKey: 'userId' });

const db = {
  sequelize,
  Sequelize,
  User,
  Group,
  Membership,
  Availability,
  Rehearsal,
  Attendance,
  Location,
  Resource,
  RehearsalResource,
  Notification,
  UserSetting,
};

export default db;
