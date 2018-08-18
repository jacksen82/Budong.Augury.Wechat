// services/client.js

const constants = require('../data/constants.js')
const store = require('../data/store.js')
const ajax = require('../utils/ajax.js')

const client = {

  /*
    说明：客户端授权调起
  */
  authorize: function (callback) {

    if (constants.APP_3RD_SESSION) {
      wx.checkSession({
        success: function (res) {
          
          client.token(callback);
        },
        fail: function (res) {

          client.login(callback);
        }
      });
    } else {
      client.login(callback);
    }
  },

  /*
    说明：客户端授权
  */
  token: function (callback) {

    ajax.post('/client/token.ashx', {

    }, function (data) {
      
      if (data.code == 0 && data.data && data.data.session3rd) {
        data = data.data || {};
        store.auth(data.session3rd, data.client);
        client.getShareInfo();
        callback(data);
      } else {
        client.login(callback);
      }
    });
  },

  /*
    说明：客户端登录
  */
  login: function (callback) {

    wx.login({
      success: function (res) {

        ajax.post('/client/login.ashx', {
          code: res.code
        }, function (data) {
          
          if (data.code == 0) {
            data = data.data || {};
            store.auth(data.session3rd, data.client);
            client.getShareInfo();
            callback(data);
          } else {
            wx.showToast({
              icon: 'none',
              title: (data.message || {}).errMsg || '网络错误'
            })
          }
        });
      },
      fail: function (res) {

        wx.showToast({
          icon: 'none',
          title: '登录失败'
        })
      }
    });
  },

  /*
    说明：更新用户信息
  */
  setUserInfo: function (userInfo, callback) {

    ajax.post('/client/setuserinfo.ashx', {
      nick: userInfo.nickName || '',
      gender: userInfo.gender || 0,
      avatarUrl: userInfo.avatarUrl || ''
    }, function (data) {

      if (data.code == 0) {
        data = data.data || {};
        store.client = data.client || {};
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
    说明：获取分享信息
  */
  getShareInfo: function () {

    if (constants.APP_QUERY_CID) {
      if (constants.APP_SHARETICKET) {

        wx.getShareInfo({
          shareTicket: constants.APP_SHARETICKET,
          success: function (res) {

            client.relate(constants.APP_QUERY_CID, res.encryptedData, res.iv);
          },
          fail: function (res) {

            wx.showToast({
              icon: 'none',
              title: res.message
            })
          }
        });
      } else {
        client.relate(constants.APP_QUERY_CID, '', '');
      }
    }
  },

  /*
    说明：建立关联关系
  */
  relate: function (relateClientId, encrypteData, iv) {

    ajax.post('/client/relate.ashx', {
      relateClientId: relateClientId || 0,
      encryptedData: encrypteData || '',
      iv: iv || ''
    }, function (data) {

    });
  },

  /*
    说明：分享回调
  */
  shareAppMessage: function (res, data, callback) {

    data = data || {};
    
    return {
      title: '默契大考验，你觉得我们之间有默契吗？',
      imageUrl: 'http://www.cncrk.com/up/1707/20177384354.png',
      path: '/pages/index/index?scene=cid-' + (store.client.id || 0),
      success: function (_res) {

        client.share(res.from, data.capsuleId, callback);
      },
      fail: function (res) {

        wx.showToast({
          icon: 'none',
          title: '放弃一次了解的机会'
        })
      }
    }
  },

  /*
    说明：分享回调 [ 成功/失败 ]
  */
  share: function (shareFrom, capsuleId, callback) {

    ajax.post('/client/share.ashx', {
      shareFrom: shareFrom
    }, function (data) {

      if (data.code == 0) {
        callback(data.data || {});
      } else {
        wx.showToast({
          icon: 'none',
          title: (data.message || {}).errMsg || '网络错误'
        })
      }
    });
  },

  /*
    说明：获取好友
  */
  friends: function(pageId, callback){

    if (pageId == 1) {
      callback({
        pageCount: 2,
        data: [{
          relateClientId: 1,
          nick: '申栩',
          avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Fs3GwU6WUX9nqwSiawIicIKuHrnlpQ5J3Y5rMaInbfL1Cb5ffoxDF5lWD5hibgWt0ljfibl8iaib4mYg9wLyWZhac7LA/132'
        }, {
          relateClientId: 2,
          nick: '护腕爱',
          avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/IujJKkcVyOLsibDtJwQHW6vVBKydedcyqwoLlDF9R9HFJU3SYrpX5QYJwfnE4CIicTXdY2egU1OuMLv8dRXtBQdg/132'
          }, {
            relateClientId: 3,
            nick: '贝贝',
            avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKIZVQwX01EgB6RAOWHwKp4yeRg76tctbhvtibTfZrNAXTtybqe3yQib7dLbhJJFmfQ2wWk5vpicx3Aw/132'
        }, {
          relateClientId: 4,
          nick: '不知道昵称最长能取多长',
          avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/WmxkCfNhM2jsHGia1600KjCSqC7ehwUiafhJyWVLS5SQjYoJWvxXHMs7jKich0bqvSbSSTa09iclJRibtBHS6crMD4Q/132'
          }, {
            relateClientId: 5,
            nick: '佳品娘娘娘',
            avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Hp0w2E15ibNRkVuR20dF64qW965KQRTxb3XHlejbS0Ziba8aFSRoIPlsJ4lIXvb2ticfrrRgRoghIKsP7CtFbYBRg/132'
        }, {
          relateClientId: 6,
          nick: '先皇后',
          avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKWtH9kqVLWkNKY6zOOv78AmzY7E94vejmZ0h3icHkXcs7EiaXNAOJMxCveNO6VrjUzzCGibSB5AjdBw/132'
        }]
      });
    } else {
      callback({

      });
    }
  }
};

module.exports = client;