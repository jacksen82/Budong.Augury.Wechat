// pages/question/add.js

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
    optionSelectedIndex: -1,
    templateId: 0,
    templateIndex: -1,
    templateItems: [],
    templateVisible: false,
  },

  /* 
    说明：页面加载事件
  */
  onLoad: function (options) {

    var wp = this;

    tacit.template.list(function(data){

      wp.data.templateItems = data.data || [];
      wp.data.templateItems.push({ id: 0, options: ',', title: '自定义题目' });
      wp.setData({
        templateItems: wp.data.templateItems
      });
    });
  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {

    return client.shareAppMessage(res, {}, function () { });
  },

  /*
    说明：添加选项
  */
  onAdd: function(){

    if (this.data.optionItems.length < 10){
      this.data.optionItems.push('');
      this.setData({
        optionItems: this.data.optionItems
      });
    } else {
      wx.showToast({
        icon: 'none',
        title: '选项不能超过10个',
      }) 
    }
  },

  /*
    说明：删除选项
  */
  onRemove: function(e){

    if (this.data.optionItems.length > 2) {
      for (var i = 0; i < this.data.optionItems.length; i++){
        if (i == e.currentTarget.dataset.index){
          this.data.optionItems.splice(i, 1);
        }
      }
      this.setData({
        optionItems: this.data.optionItems
      });
    } else {
      wx.showToast({
        icon: 'none',
        title: '至少需要两个选项',
      })
    }
  },

  /*
    说明：输入题目
  */
  onTitleInput: function(e){

    this.setData({
      title: e.detail.value || ''
    });
  },

  /*
    说明：输入题目选项
  */
  onOptionInput: function(e){

    if (e.currentTarget.dataset.index > -1 && e.currentTarget.dataset.index < this.data.optionItems.length) {
      this.data.optionItems[e.currentTarget.dataset.index] = e.detail.value || '';
      this.setData({
        optionItems: this.data.optionItems
      });
    }
  },

  /*
    说明：选择正确选项
  */
  onOptionChange: function(e){

    this.setData({
      optionSelectedIndex: parseInt(e.detail.value, 10)
    });
  },

  /*
    说明：选择题目模板
  */
  onTemplateChange: function(e){

    var index = (e.detail.value && e.detail.value.length ? e.detail.value[0] : -1);
    var template = (index > -1 &&  index < this.data.templateItems.length ? this.data.templateItems[index] : {});

    this.setData({
      title: (template.id ? template.title : ''),
      optionSelectedIndex: -1,
      optionItems: template.options.split(','),
      templateId: template.id || 0,
      templateIndex: index
    });
  },

  /*
    说明：保存题目
  */
  onSubmit: function(){

    var haveEmptyOption = false;

    for (var i = 0; i < this.data.optionItems.length; i++){
      if (!this.data.optionItems[i]) {
        haveEmptyOption = true;
      }
    }

    if (!this.data.title){
      wx.showToast({
        icon: 'none',
        title: '题目不能为空',
      })
    } else if (haveEmptyOption == true) {
      wx.showToast({
        icon: 'none',
        title: '不能有空选项',
      })
    } else if (this.data.optionSelectedIndex < 0 || this.data.optionSelectedIndex >= this.data.optionItems.length) {
      wx.showToast({
        icon: 'none',
        title: '请选择你的正确选项',
      })
    } else {
      tacit.question.add(this.data.title, this.data.optionItems.join(','), this.data.optionSelectedIndex, function(data){

        wx.showToast({
          title: '添加成功',
        })
        setTimeout(function () {

          store.tacit.questionChanged = true;
          wx.navigateBack()
        }, 1500);
      });
    }
  }
})
