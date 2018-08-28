// pages/friend/result.js

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
    clientAvatar: '',
    clientCharacterName: '',
    clientCharacterReview: '',
    clientCharacterColor: '',
    clientCharacterSuit: '',
    clientCharacterUnsuit: '',
    clientPraiseCount: 0,
    clientTreadCount: 0,
    commentPageId: 1,
    commentLoading: false,
    commentIsEnd: false,
    commentItems: []
  },

  /* 
    说明：页面加载事件
  */
  onLoad: function (options) {

    this.setData({
      clientId: options.rcid 
    });

    this.doClientReport();

    this.doCommentList(this.data.commentPageId);
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
    说明：绑定客户端测试报告
  */
  doClientReport: function () {

    var wp = this;

    client.detail(this.data.clientId, function (data) {

      wp.setData({
        clientAvatar: store.client.avatarUrl,
        clientCharacterName: store.client.characterName,
        clientCharacterReview: store.client.characterReview,
        clientCharacterColor: store.client.character.color,
        clientCharacterSuit: store.client.character.suitCharacterName,
        clientCharacterUnsuit: store.client.character.unsuitCharacterName,
        clientPraiseCount: store.client.praiseCount,
        clientTreadCount: store.client.treadCount,
      });
    });

  },

  /*
    说明：绑定评价列表
  */
  doCommentList: function (pageId) {

    var wp = this;

    this.setData({
      commentLoading: true
    });

    client.comment.list(this.data.clientId, pageId, function (data) {

      wp.data.commentItems = (pageId == 1 ? [] : (wp.data.commentItems || []));
      wp.data.commentItems = wp.data.commentItems.concat(data.data || []);
      wp.setData({
        commentPageId: pageId,
        commentLoading: false,
        commentIsEnd: (pageId >= data.pageCount),
        commentItems: wp.data.commentItems
      });
    });
  },

  /*
    说明：评价测试结果
  */
  onAppraise: function (e) {

    client.comment.appraise(this.data.clientId, e.currentTarget.dataset.appraise, function (data) {

      wx.showToast({
        title: '评价成功',
      })
    });
  }
})
