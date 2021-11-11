
'use strict';
const pump = require('pump');
const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;

class GitLabController extends Controller {
  async image() {
    const { ctx } = this;
    const parts = ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      const fieldname = stream.fieldname; // file表单的名字
      // 上传图片的目录
      const dir = await this.service.tools.getUploadFile(stream.filename);
      const target = dir.uploadDir;
      const writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir,
      });
    }

    if (Object.keys(files).length > 0) {
      ctx.body = {
        code: 200,
        message: '图片上传成功',
        data: files,
      };
    } else {
      ctx.body = {
        code: 500,
        message: '图片上传失败',
        data: {},
      };
    }
  }
  async getList() {
    const { ctx, config: { uploadDir } } = this;
    let photeList = [];
    const timeList = fs.readdirSync(uploadDir);
    timeList.forEach(n => {
      console.log(fs.readdirSync(path.join(uploadDir, n)));
      photeList = photeList.concat(fs.readdirSync(path.join(uploadDir, n)).map(item => {
        return `/public/upload/${n}/${item}`;
      }));
    });
    ctx.body = {
      code: 200,
      message: '成功',
      data: photeList,
    };
  }
}

module.exports = GitLabController;
