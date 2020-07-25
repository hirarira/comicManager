class ComicVolInfo {
  constructor(dbsetting) {
    this.sequelize = require('sequelize');
    this.model = dbsetting.define('comicVolInfo', {
      id: {
        type: this.sequelize.INTEGER,
        primaryKey: true
      },
      comicVolID: this.sequelize.INTEGER,
      userID: this.sequelize.INTEGER,
      readFlag: this.sequelize.BOOLEAN,
      readDate: this.sequelize.INTEGER,
      buyFlag: this.sequelize.BOOLEAN,
      buyDate: this.sequelize.INTEGER,
      comment: this.sequelize.TEXT
    }, {
      // モデル名をそのままテーブル名として使う
      freezeTableName: true,
      timestamps: false
    });
  }
  async getComicVol(comicVol, userID) {
    const comicVolIDList = comicVol.map((x)=>{
      return x.id;
    });
    const comicVolInfoList = await this.model.findAll({
      where: {
        comicVolID: {
          [this.sequelize.Op.in]: comicVolIDList
        },
        userID: userID
      }
    });
    const resBody = comicVol.map((x)=>{
      const vol = x.dataValues;
      const info = comicVolInfoList.find((y)=>{
        return vol.id === y.comicVolID;
      });
      if(info) {
        vol.info = info.dataValues;
      }
      return vol;
    });
    return resBody;
  }
  async createComicVolInfo(options) {
    return await this.model.create({
      comicVolID: options.comicVolID,
      userID: options.userID,
      readFlag: options.readFlag,
      readDate: options.readDate,
      buyFlag: options.buyFlag,
      buyDate: options.buyDate,
      comment: options.comment
    });
  }
}

module.exports = ComicVolInfo;
