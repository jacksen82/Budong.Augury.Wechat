// pages/question/list.js

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
    questionLoaded: false,
    questionItems: []
  },

  /* 
    说明：页面加载事件
  */
  onLoad: function (options) {
    
    this.doQuestionLoad();
  },

  /*
    说明：页面显示事件
  */
  onShow: function(){

    var wp = this;

    if (this.data.questionLoaded == true && store.tacit.questionChanged == true) {
      this.doQuestionLoad();
    }
  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {

    return client.shareAppMessage(res, {}, function () { });
  },

  /*
    说明：添加题目
  */
  onAdd: function(){

    wx.navigateTo({
      url: '/pages/question/add',
    })
  },

  /*
    说明：更多题目操作
  */
  onMore: function(e){

    var wp = this;

    wx.showActionSheet({
      itemList: ['删除'],
      success: function(res){

        if (res.tapIndex == 0) {
          tacit.question._delete(e.currentTarget.dataset.questionId, function(data){
            
            wx.showToast({
              title: '删除成功',
            })
            wp.doQuestionLoad();
          });
        }
      }
    })
  },

  /*
    说明：加载题目
  */
  doQuestionLoad: function(){

    var wp = this;

    tacit.question.list(function (data) {

      data.data = data.data || [];
      store.tacit.questionChanged = false;

      for (var i = 0; i < data.data.length; i++) {
        data.data[i].optionItems = data.data[i].options.split(',');
      }
      
      wp.setData({
        questionLoaded: true,
        questionItems: data.data || []
      });
    });
  }

})
