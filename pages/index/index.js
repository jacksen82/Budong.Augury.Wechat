// pages/index/index.js

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
    clientNick: '',
    clientGender: 0,
    clientAvatar: '',
    clientActived: 0,
    questionCount: 0,
    chooseCount: 0,
    friendItems: []
  },

  /* 
    说明：页面加载事件
  */
  onLoad: function (options) {

    var wp = this; 

    utils.waitingFor(function(){

      return store.client && store.client.id ? true : false;
    }, function(){

      wx.navigateTo({
        url: '/pages/friend/list',
      })
      return ;
      constants.APP_QUERY_CID = utils.getScene('cid') || 0;

      if (constants.APP_QUERY_CID && constants.APP_QUERY_CID != store.client.id){
        wx.showToast({
          title: '开始测试',
        })
      } else {
        wp.setData({
          clientNick: store.client.nick || '没有昵称',
          clientGender: store.client.gender,
          clientAvatar: store.client.avatarUrl,
          clientActived: store.client.actived,
          questionCount: store.client.questionCount,
          friendItems: store.client.friends || []
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
    说明：开始测试
  */
  onTrialStart: function(){

    wx.navigateTo({
      url: '/pages/trial/start',
    })
  },

  /*
    说明：查看好友列表
  */
  onFriendList: function(){

    wx.navigateTo({
      url: '/pages/friend/list',
    })
  },

  /*
    说明：查看好友结果
  */
  onFriendResult: function(e){

    wx.navigateTo({
      url: '/pages/friend/result?rcid=' + e.currentTarget.dataset.relateClientId,
    })
    console.log(e);
  }
})
