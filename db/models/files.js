'use strict';
module.exports = (sequelize, DataTypes) => {
  const files = sequelize.define('files', {
      id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true
      },
      fileName: {
          type: DataTypes.STRING,
          allowNull: false
      },
      complete: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      }
  });
  return files;
};
