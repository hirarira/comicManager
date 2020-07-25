class Author {
  constructor(dbsetting) {
    this.sequelize = require('sequelize');
    this.model = dbsetting.define('author', {
      id: {
        type: this.sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: this.sequelize.STRING,
        unique: true
      }
    }, {
      // モデル名をそのままテーブル名として使う
      freezeTableName: true,
      timestamps: false
    });
  }
  async getAuthor(author_id) {
    return await this.model.findOne({
      where: {
        id: author_id
      }
    });
  }
  async getAuthors() {
    return await this.model.findAll();
  }
  async createAuthor(options) {
    return await this.model.create({
      name: options.name
    });
  }
}

module.exports = Author;
