// pages/trial/result.js

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
    clientAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep5EXtBZKbrfCbhpiadZkbw9fUf1pAOe9LPibdPwkSFNMYn94JNxibhgXibwWTnwmARGFwYiaD4hJRiaXsQ/132',
    clientGender: 1,
    clientNick: '胡万爱'
  },

  /* 
    说明：页面加载事件
  */
  onLoad: function (options) {

    var wp = this;

    tacit.report(store.client.id, function (data) {

      console.log(data);
    });
  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {

    return client.shareAppMessage(res, {}, function () { });
  }
})
