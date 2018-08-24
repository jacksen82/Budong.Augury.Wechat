// services/question.js

const constants = require('../data/constants.js')
const store = require('../data/store.js')
const ajax = require('../utils/ajax.js')

const question = {

  /*
    说明：获取所有题目
  */
  all: function (callback) {

    ajax.post('/client/question/all.ashx', {

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
    说明：用户答题
  */
  choose: function(questionId, questionItemId, callback){

    ajax.post('/client/question/choose.ashx', {
      questionId: questionId,
      questionItemId: questionItemId
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
};

module.exports = question;