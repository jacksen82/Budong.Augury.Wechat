// pages/friend/result.js

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
    friendClientId: 0,
    friendAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep5EXtBZKbrfCbhpiadZkbw9fUf1pAOe9LPibdPwkSFNMYn94JNxibhgXibwWTnwmARGFwYiaD4hJRiaXsQ/132',
    friendGender: 1,
    friendNick: '胡万爱',
    commentPageId: 1,
    commentLoading: false,
    commentIsEnd: false,
    commentItems: []
  },

  /* 
    说明：页面加载事件
  */
  onLoad: function (options) {

    var wp = this;

    tacit.report(options.rcid, function(data){

      wp.setData({
        friendClientId: options.rcid
      });
      wp.doCommentList(wp.data.commentPageId);
    });
  },

  /*
    说明：上拉加载更多
  */
  onReachBottom: function () {

    if (!this.data.commentLoading && !this.data.commentIsEnd) {
      this.doCommentList(this.data.commentPageId + 1);
    }
  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {

    return client.shareAppMessage(res, {}, function () { });
  },

  /*
    说明：加载评价列表
  */
  doCommentList: function(pageId){

    var wp = this;

    this.setData({
      friendLoading: true
    });

    tacit.comments(this.data.friendClientId, pageId, function (data) {

      if (pageId == 1) {
        wp.data.commentItems = [];
      } else {
        wp.data.commentItems = wp.data.commentItems || [];
      }
      wp.data.commentItems = wp.data.commentItems.concat(data.data || []);
      wp.setData({
        commentPageId: pageId,
        commentLoading: false,
        commentIsEnd: (pageId >= data.pageCount),
        commentItems: wp.data.commentItems
      });
    });
  }
})
