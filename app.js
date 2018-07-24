//  app.js

const util = require('utils/utils.js')
const constants = require('data/constants.js')
const store = require('data/store.js')

App ({

  /*
    说明：启动时发生
  */
  onLaunch: function(options){

    wx.showShareMenu({
      withShareTicket: true
    });

    //  获取本地缓存三方标识
    constants.APP_SCENE = options.scene || 0;
    constants.APP_QUERY = options.query || {};
    constants.APP_SHARETICKET = options.shareTicket;
    constants.APP_3RD_SESSION = wx.getStorageSync('session3rd') || '';
  },
  
  /*
    说明：打开时发生
  */
  onShow: function (options) {

    //  获取本地缓存三方标识
    constants.APP_SCENE = options.scene || 0;
    constants.APP_QUERY = options.query || {};
    constants.APP_SHARETICKET = options.shareTicket;
  }
})