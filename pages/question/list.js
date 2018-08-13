// pages/question/list.js

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
    questionItems: [{
        title: '我喜欢吃的水果？'
      },{
        title: '我喜欢去的旅行目的地？'
      },{
        title: '我喜欢看的电影类型？'
      },{
        title: '我一个人时想去的场所？'
      }]
  },

  /* 
    说明：页面加载事件
  */
  onLoad: function (options) {

    var wp = this;

    utils.waitingFor(function () {

      return store.client && store.client.id ? true : false;
    }, function () {

      wp.setData({
        loading: false,
        clientNick: (store.client || {}).nick,
        clientGender: (store.client || {}).gender,
        clientAvatar: (store.client || {}).avatarUrl,
        clientActived: (store.client || {}).actived
      });
    });
  },

  /*
    说明：页面显示事件
  */
  onShow: function (options) {

  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {

    return client.shareAppMessage(res, {}, function () { });
  },

  /*
    说明：绑定授权
  */
  onGetUserInfo: function (res) {

    if (res.detail && res.detail.errMsg == 'getUserInfo:ok') {
      client.setUserInfo(res.detail.userInfo, function (data) {

      });
    } else {
      wx.showToast({
        icon: 'none',
        title: '登录失败',
      })
    }
  },

  /*
    说明：题目管理
  */
  onQuestion: function () {

    wx.navigateTo({
      url: '/pages/question/list',
    })
  }
})
