// services/client.js

const constants = require('../data/constants.js')
const store = require('../data/store.js')
const ajax = require('../utils/ajax.js')

const tacit = {

  //  题目模板
  template: {

    /*
      说明：获取所有题目模板
    */
    list: function(callback){

      ajax.post('/tacit/template/list.ashx', {

      }, function (data) {

        if (data.code == 0) {
          data = data.data || {};
          callback(data);
        } else {
          wx.showToast({
            icon: 'none',
            title: data.message
          })
        }
      });
    }
  },

  //  题目管理
  question: {

    /*
      说明：获取所有题目
    */
    list: function(callback){

      ajax.post('/tacit/question/list.ashx', {

      }, function (data) {

        if (data.code == 0) {
          data = data.data || {};
          callback(data);
        } else {
          wx.showToast({
            icon: 'none',
            title: data.message
          })
        }
      });
    },

    /*
      说明：添加题目
    */
    add: function(title, options, optionSelectedIndex, callback){

      ajax.post('/tacit/question/add.ashx', {
        title: title,
        options: options,
        optionSelectedIndex: optionSelectedIndex
      }, function (data) {

        if (data.code == 0) {
          data = data.data || {};
          callback(data);
        } else {
          wx.showToast({
            icon: 'none',
            title: data.message
          })
        }
      });
    },

    /*
      说明：删除题目
    */
    _delete: function(questionId, callback){

      ajax.post('/tacit/question/delete.ashx', {
        questionId: questionId
      }, function (data) {

        if (data.code == 0) {
          data = data.data || {};
          callback(data);
        } else {
          wx.showToast({
            icon: 'none',
            title: data.message
          })
        }
      });
    }
  }
};

module.exports = tacit;