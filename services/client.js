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

    //  请求 token 接口
    callback({
      code: 0,
      message: '成功'
    });
  },

  /*
    说明：客户端登录
  */
  login: function (callback) {

    wx.login({
      success: function (res) {

        //  请求 login 接口
        callback({
          code: 0,
          message: '成功'
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
    说明：建立用户关系
  */
  getShareInfo: function () {

    if (constants.APP_QUERY.cid) {
      if (constants.APP_SHARETICKET) {

        wx.getShareInfo({
          shareTicket: constants.APP_SHARETICKET,
          success: function (res) {

            //  请求 relate 接口
            callback({
              code: 0,
              message: '成功'
            });
          },
          fail: function (res) {

            wx.showToast({
              icon: 'none',
              title: res.message
            })
          }
        });
      } else {

        //  请求 relate 接口
        callback({
          code: 0,
          message: '成功'
        });
      }
    }
  },

  /*
    说明：分享回调
  */
  shareAppMessage: function (res, data, callback) {

    data = data || {};
    
    return {
      title: '对话未来，对 20 年后的自己说',
      imageUrl: 'http://www.cncrk.com/up/1707/20177384354.png',
      path: '/pages/index/index?cid=' + (store.client.id || 0) + '&capid=' + (data.capsuleId || 0),
      success: function (_res) {

        //  请求 share 接口
        callback({
          code: 0,
          message: '成功'
        });
      },
      fail: function (res) {

        wx.showToast({
          icon: 'none',
          title: '取消分享'
        })
      }
    }
  }
};

module.exports = client;