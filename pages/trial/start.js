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
    title: '',
    optionItems: [],
    optionIndex: -1,
    questionId: 0,
    questionIndex: 0,
    questionItems: []
  },

  /* 
    说明：页面加载事件
  */
  onLoad: function (options) {

    var wp = this;

    tacit.questions(function(data){

      wp.setData({
        questionItems: data || []
      });
      wp.doQuestionNext(0);
    });
  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {

    return client.shareAppMessage(res, {}, function () { });
  },

  /*
    说明：显示下一道题目
  */
  doQuestionNext: function(index){

    if (index > -1 && index < this.data.questionItems.length ){
      this.setData({
        title: this.data.questionItems[index].title || '',
        optionItems: this.data.questionItems[index].options || [],
        questionId: this.data.questionItems[index].id || 0,
        questionIndex: index
      });
    } else {
      wx.navigateTo({
        url: '/pages/trial/report',
      })
    }
  },

  /*
    说明：选中题目选项
  */
  onOptionChange: function(e){

    this.setData({
      optionIndex: e.detail.value
    });
  },

  /*
    说明：回答进入下一题
  */
  onSubmit: function(){

    var wp = this;

    if (this.data.optionIndex < 0 || this.data.optionIndex >= this.data.optionItems.length) {
      wx.showToast({
        icon: 'none',
        title: '请选择答案',
      })
    } else {
      tacit.answer(this.data.questionId, this.data.questionIndex, function(data){

        console.log(data);
        wp.doQuestionNext(wp.data.questionIndex + 1);
      });
    }
  }
})
