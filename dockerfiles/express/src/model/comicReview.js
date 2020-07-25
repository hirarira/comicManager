class ComicReview {
  constructor(dbsetting) {
    this.sequelize = require('sequelize');
    this.model = dbsetting.define('comicReview', {
      id: {
        type: this.sequelize.INTEGER,
        primaryKey: true
      },
      comicID: this.sequelize.INTEGER,
      userID: this.sequelize.INTEGER,
      rate: this.sequelize.INTEGER,
      comment: this.sequelize.TEXT,
    }, {
      // モデル名をそのままテーブル名として使う
      freezeTableName: true,
      timestamps: false
    });
  }
  async getReview(comicID, userID) {
    return await this.model.findOne({
      where: {
        comicID: comicID,
        userID: userID
      }
    });
  }
  async createComic(options) {
    return await this.model.create({
      comicID: options.comicID,
      userID: options.userID,
      rate: options.rate,
      comment: options.comment
    });
  }
}

module.exports = ComicReview;
