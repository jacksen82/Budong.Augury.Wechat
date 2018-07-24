//  utils/ajax.js

const constants = require('../data/constants.js');
const store = require('../data/store.js');

/*
  说明：POST 请求方法
*/
const post = function (url, data, callback, loading) {

  //  如果正在请求，则跳出
  if (constants.AJAX_URL_STATE[url] == true) return;

  //  设置正在请求中..
  constants.AJAX_URL_STATE[url] = true;

  //  如果需要则显示正在加载
  (loading == true) && wx.showLoading();

  //  记录开始请求时间
  let beginTime = new Date().getTime();

  //  发起请求
  wx.request({
    url: constants.HTTP_API + url,
    data: Object.assign({
      scene: constants.APP_SCENE,
      session3rd: constants.APP_3RD_SESSION
    }, data),
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (data) {

      callback && callback(data.data || { code: constants.AJAX_CODE_TYPE.UNKONOW, message: '发生未知错误' });
    },
    fail: function (res) {

      callback && callback({ code: constants.AJAX_CODE_TYPE.UNKONOW, message: res || '发生未知错误' });
    },
    complete: function (res) {

      (loading == true) && wx.hideLoading();
      constants.AJAX_URL_STATE[url] = false;
    }
  });
}

/*
  说明：UPLOAD 请求方法
*/
const upload = function (url, data, fileName, tempFilePath, callback) {

  //  如果正在请求，则跳出
  if (constants.AJAX_URL_STATE[url] == true) return;

  //  设置正在请求中..
  constants.AJAX_URL_STATE[url] = true;

  //  开始上传
  wx.uploadFile({
    url: constants.HTTP_API + url,
    filePath: tempFilePath,
    name: fileName,
    formData: Object.assign({
      scene: constants.APP_SCENE,
      session3rd: constants.APP_3RD_SESSION
    }, data),
    success: function (data) {
      
      callback && callback((JSON.parse(data.data) || {}) || { code: constants.AJAX_CODE_TYPE.UNKONOW, message: '发生未知错误' });
    },
    fail: function (res) {
      
      callback && callback({ code: constants.AJAX_CODE_TYPE.UNKONOW, message: res || '上传失败' });
    },
    complete: function () {
      
      wx.hideLoading();
      constants.AJAX_URL_STATE[url] = false;
    }
  }).onProgressUpdate(function (res) {

    wx.showLoading({
      title: '已上传' + res.progress
    });
  })
}

module.exports = {
  post: post,
  upload: upload
}
