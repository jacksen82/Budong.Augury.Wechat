// services/client.js

const constants = require('../data/constants.js')
const store = require('../data/store.js')
const ajax = require('../utils/ajax.js')

const friend = {

  /*
    说明：获取好友列表
  */
  list: function (pageId, callback) {

    ajax.post('/client/friend/list.ashx', {
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
  }
};

module.exports = friend;