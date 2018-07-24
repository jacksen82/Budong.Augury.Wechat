// pages/index/index.js

const app = getApp()
const utils = require('../../utils/utils.js')
const constants = require('../../data/constants.js')
const store = require('../../data/store.js')
const client = require('../../services/client.js')

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

    var wp = this;

    client.authorize(function(data){
      
      console.log('load');
    });
  },

  /*
    说明：页面显示事件
  */
  onShow: function (options) {

    console.log('show');
  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {
    
    return client.shareAppMessage(res, {}, function(){ });
  }
})
