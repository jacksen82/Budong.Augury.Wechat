// services/comment.js

const constants = require('../data/constants.js')
const store = require('../data/store.js')
const ajax = require('../utils/ajax.js')

const comment = {

  /*
    说明：获取评价列表
  */
  list: function (toClientId, pageId, callback) {

    ajax.post('/client/comment/list.ashx', {
      toClientId: toClientId,
      pageId: pageId,
      pageSize: 20
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
    说明：发表评价
  */
  appraise: function(toClientId, appraise, callback){

    ajax.post('/client/comment/appraise.ashx', {
      toClientId: toClientId,
      appraise: appraise
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

module.exports = comment;