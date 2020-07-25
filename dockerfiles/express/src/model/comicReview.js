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
  async createComicReview(options) {
    return await this.model.create({
      comicID: options.comicID,
      userID: options.userID,
      rate: options.rate,
      comment: options.comment
    });
  }
  async updateComicReview(options) {
    return await this.model.update({
      rate: options.rate,
      comment: options.comment
    },{
      where: {
        comicID: options.comicID,
        userID: options.userID
      }
    })
  }
}

module.exports = ComicReview;
