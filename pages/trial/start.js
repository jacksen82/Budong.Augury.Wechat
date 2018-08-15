// pages/trial/start.js

const app = getApp()
const utils = require('../../utils/utils.js')
const constants = require('../../data/constants.js')
const store = require('../../data/store.js')
const client = require('../../services/client.js')
const tacit = require('../../services/tacit.js')

Page({

  /*
    说明：页面的初始数据
  */
  data: {

  },

  /* 
    说明：页面加载事件
  */
  onLoad: function (options) {

  },

  /*
    说明：页面显示事件
  */
  onShow: function () {

    var wp = this;

  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {

    return client.shareAppMessage(res, {}, function () { });
  }

})
