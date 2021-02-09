const { DataTypes } = require('sequelize');

function defineTask(orm) {
  return orm.define(
    'task',
    {
      job: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      assigneeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      attachment: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      cancel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'tasks',
    }
  );
}

module.exports = {
  defineTask,
};
