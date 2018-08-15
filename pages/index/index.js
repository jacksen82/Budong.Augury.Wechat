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
    clientNick: '',
    clientGender: 0,
    clientAvatar: '',
    clientActived: 0,
    questionCount: 0,
    visiterItems: []
  },

  /* 
    说明：页面加载事件
  */
  onLoad: function (options) {

    var wp = this; 

    utils.waitingFor(function(){

      return store.client && store.client.id ? true : false;
    }, function(){

      constants.APP_QUERY_CID = utils.getScene('cid') || 0;

      if (constants.APP_QUERY_CID && constants.APP_QUERY_CID != store.client.id){
        wx.showToast({
          title: '开始测试',
        })
      } else {
        wp.setData({
          clientNick: (store.client || {}).nick,
          clientGender: (store.client || {}).gender,
          clientAvatar: (store.client || {}).avatarUrl,
          clientActived: (store.client || {}).actived,
          questionCount: (store.client || {}).questionCount
        });
      }
    });
  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {
    
    return client.shareAppMessage(res, {}, function(){ });
  },

  /*
    说明：绑定授权
  */
  onGetUserInfo: function(res){

    var wp = this;

    if (res.detail && res.detail.errMsg == 'getUserInfo:ok') {
      client.setUserInfo(res.detail.userInfo, function (data) {

        wp.setData({
          clientNick: (store.client || {}).nick,
          clientGender: (store.client || {}).gender,
          clientAvatar: (store.client || {}).avatarUrl,
          clientActived: (store.client || {}).actived,
          questionCount: (store.client || {}).questionCount
        });
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
  onQuestion: function(){

    wx.navigateTo({
      url: '/pages/question/list',
    })
  },

  /*
    说明：邀请好友
  */
  onShare: function(){

    wx.showModal({
      title: '操作提示',
      content: '还没有题目，请先添加',
      confirmText: '添加题目',
      success: function (res) {

        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/question/list',
          })
        }
      }
    });
  }
})
