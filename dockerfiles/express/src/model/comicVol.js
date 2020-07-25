class ComicVol {
  constructor(dbsetting) {
    this.sequelize = require('sequelize');
    this.model = dbsetting.define('comicVol', {
      id: {
        type: this.sequelize.INTEGER,
        primaryKey: true
      },
      comicID: this.sequelize.INTEGER,
      number: this.sequelize.STRING,
      image: this.sequelize.TEXT,
    }, {
      // モデル名をそのままテーブル名として使う
      freezeTableName: true,
      timestamps: false
    });
  }
  async getComicVol(comicID) {
    return await this.model.findAll({
      where: {
        comicID: comicID
      }
    });
  }
  async createComicVol(options) {
    return await this.model.create({
      comicID: options.comicID,
      number: options.number,
      image: options.image
    });
  }
}

module.exports = ComicVol;
