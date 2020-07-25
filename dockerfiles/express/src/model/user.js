class User {
  constructor(dbsetting) {
    this.sequelize = require('sequelize');
    this.model = dbsetting.define('user', {
      id: {
        type: this.sequelize.INTEGER,
        primaryKey: true
      },
      username: {
        type: this.sequelize.TEXT,
        unique: true
      },
      pass: this.sequelize.STRING
    }, {
      // モデル名をそのままテーブル名として使う
      freezeTableName: true,
      timestamps: false
    });
  }
  async getUser(userid) {
    return await this.model.findOne({
      where: {
        id: userid
      }
    });
  }
}

module.exports = User;
