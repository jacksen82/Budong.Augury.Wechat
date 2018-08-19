// pages/friend/list.js

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
    friendPageId: 1,
    friendLoading: true,
    friendIsEnd: false,
    friendItems: []
  },

  /* 
    说明：页面加载事件
  */
  onLoad: function (options) {

    this.doFriendList(this.data.friendPageId);
  },

  /*
    说明：上拉加载更多
  */
  onReachBottom: function(){

    if (!this.data.friendLoading && !this.data.friendIsEnd) {
      this.doFriendList(this.data.friendPageId + 1);
    }
  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {

    return client.shareAppMessage(res, {}, function () { });
  },

  /*
    说明：绑定好友列表
  */
  doFriendList: function(pageId){

    var wp = this;

    this.setData({
      friendLoading: true
    });

    tacit.friends(pageId, function (data) {

      if (pageId == 1) {
        wp.data.friendItems = [];
      } else {
        wp.data.friendItems = wp.data.friendItems || [];
      }
      wp.data.friendItems = wp.data.friendItems.concat(data.data || []);
      wp.setData({
        friendPageId: pageId,
        friendLoading: false,
        friendIsEnd: (pageId >= data.pageCount),
        friendItems: wp.data.friendItems
      });
    });
  }
})
