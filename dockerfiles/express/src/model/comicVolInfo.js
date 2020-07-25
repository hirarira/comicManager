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
      const info = comicVolInfoList.find((y)=>{
        return x.id === y.comicVolID;
      });
      return Object.assign(x, info);
    });
    return resBody;
  }
}

module.exports = ComicVolInfo;
