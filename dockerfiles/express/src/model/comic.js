class Comic {
  constructor(dbsetting) {
    this.sequelize = require('sequelize');
    this.model = dbsetting.define('comic', {
      id: {
        type: this.sequelize.INTEGER,
        primaryKey: true
      },
      title: {
        type: this.sequelize.STRING,
        unique: true
      },
      authorID: this.sequelize.INTEGER,
      endFlag: this.sequelize.BOOLEAN,
      image: this.sequelize.TEXT,
    }, {
      // モデル名をそのままテーブル名として使う
      freezeTableName: true,
      timestamps: false
    });
  }
  async getComic(id) {
    return await this.model.findOne({
      where: {
        id: id
      }
    });
  }
  async getComicList() {
    return await this.model.findAll();
  }
  async createComic(options) {
    return await this.model.create({
      title: options.title,
      authorID: options.authorID,
      endFlag: false,
      image: options.image
    });
  }
  async updateComic(options) {
    return await this.model.update({
      title: options.title,
      authorID: options.authorID,
      endFlag: options.endFlag,
      image: options.image
    },{
      where: {
        id: options.id
      }
    })
  }
}

module.exports = Comic;
