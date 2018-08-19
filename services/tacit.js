// services/client.js

const constants = require('../data/constants.js')
const store = require('../data/store.js')
const ajax = require('../utils/ajax.js')

const questions = [{
  id: 1,
  title: '你喜欢吃什么',
  options: [{
    item: '苹果'
  }, {
    item: '香蕉'
  }, {
    item: '西瓜'
  }, {
    item: '葡萄'
  }]
}, {
  id: 2,
  title: '加入在沙漠中，你手上拿着只有半瓶水的瓶子，你会怎么想？',
  options: [{
    item: '只剩半瓶了'
  }, {
    item: '还有半瓶呢'
  }]
}];

const friends = [{
  relateClientId: 1,
  nick: '申栩',
  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Fs3GwU6WUX9nqwSiawIicIKuHrnlpQ5J3Y5rMaInbfL1Cb5ffoxDF5lWD5hibgWt0ljfibl8iaib4mYg9wLyWZhac7LA/132',
  trialed: 0,
  timespan: '上午 8:00'
}, {
  relateClientId: 2,
  nick: '护腕爱',
  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/IujJKkcVyOLsibDtJwQHW6vVBKydedcyqwoLlDF9R9HFJU3SYrpX5QYJwfnE4CIicTXdY2egU1OuMLv8dRXtBQdg/132',
  trialed: 1,
  timespan: '昨天 12:40'
}, {
  relateClientId: 3,
  nick: '贝贝',
  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKIZVQwX01EgB6RAOWHwKp4yeRg76tctbhvtibTfZrNAXTtybqe3yQib7dLbhJJFmfQ2wWk5vpicx3Aw/132',
  trialed: 1,
  timespan: '8月12日'
}, {
  relateClientId: 4,
  nick: '不知道昵称最长能取多长',
  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/WmxkCfNhM2jsHGia1600KjCSqC7ehwUiafhJyWVLS5SQjYoJWvxXHMs7jKich0bqvSbSSTa09iclJRibtBHS6crMD4Q/132',
  trialed: 0,
  timespan: '2月23日'
}, {
  relateClientId: 5,
  nick: '佳品娘娘娘',
  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Hp0w2E15ibNRkVuR20dF64qW965KQRTxb3XHlejbS0Ziba8aFSRoIPlsJ4lIXvb2ticfrrRgRoghIKsP7CtFbYBRg/132',
  trialed: 0,
  timespan: '2018-09-11'
}, {
  relateClientId: 6,
  nick: '先皇后',
  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKWtH9kqVLWkNKY6zOOv78AmzY7E94vejmZ0h3icHkXcs7EiaXNAOJMxCveNO6VrjUzzCGibSB5AjdBw/132',
  trialed: 1,
  timespan: '2017-04-14'
}, {
  relateClientId: 2,
  nick: '护腕爱',
  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/IujJKkcVyOLsibDtJwQHW6vVBKydedcyqwoLlDF9R9HFJU3SYrpX5QYJwfnE4CIicTXdY2egU1OuMLv8dRXtBQdg/132',
  trialed: 1,
  timespan: '昨天 12:40'
}, {
  relateClientId: 3,
  nick: '贝贝',
  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKIZVQwX01EgB6RAOWHwKp4yeRg76tctbhvtibTfZrNAXTtybqe3yQib7dLbhJJFmfQ2wWk5vpicx3Aw/132',
  trialed: 1,
  timespan: '8月12日'
}, {
  relateClientId: 4,
  nick: '不知道昵称最长能取多长',
  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/WmxkCfNhM2jsHGia1600KjCSqC7ehwUiafhJyWVLS5SQjYoJWvxXHMs7jKich0bqvSbSSTa09iclJRibtBHS6crMD4Q/132',
  trialed: 0,
  timespan: '2月23日'
}, {
  relateClientId: 5,
  nick: '佳品娘娘娘',
  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Hp0w2E15ibNRkVuR20dF64qW965KQRTxb3XHlejbS0Ziba8aFSRoIPlsJ4lIXvb2ticfrrRgRoghIKsP7CtFbYBRg/132',
  trialed: 0,
  timespan: '2018-09-11'
}, {
  relateClientId: 6,
  nick: '先皇后',
  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKWtH9kqVLWkNKY6zOOv78AmzY7E94vejmZ0h3icHkXcs7EiaXNAOJMxCveNO6VrjUzzCGibSB5AjdBw/132',
  trialed: 1,
  timespan: '2017-04-14'
}];

const comments = [{
  relateClientId: 5,
  nick: '佳品娘娘娘',
  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Hp0w2E15ibNRkVuR20dF64qW965KQRTxb3XHlejbS0Ziba8aFSRoIPlsJ4lIXvb2ticfrrRgRoghIKsP7CtFbYBRg/132',
  trialed: 0,
  timespan: '2018-09-11'
}, {
  relateClientId: 6,
  nick: '先皇后',
  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKWtH9kqVLWkNKY6zOOv78AmzY7E94vejmZ0h3icHkXcs7EiaXNAOJMxCveNO6VrjUzzCGibSB5AjdBw/132',
  trialed: 1,
  timespan: '2017-04-14'
}];

const tacit = {

  /*
    说明：答题
  */
  answer: function (questionId, optionIndex, callback) {

    callback({});
  },

  /*
    说明：获取指定用户的分析结果
  */
  report: function (clientId, callback) {

    callback({});
  },

  /*
    说明：题目模块
  */
  questions: function (callback) {
    
    callback(questions);
  },

  /*
    说明：获取我的好友列表
  */
  friends: function (pageId, callback){

    for (var i = 0; i < friends.length; i++) {
      (i > pageId) && (friends[i].nick += ' - ' + pageId)
    }
    callback({
      pageCount: 2,
      data: friends
    });
  },

  /*
    说明：获取指定用户评价列表
  */
  comments: function (clientId, pageId, callback){

    for (var i = 0; i < comments.length; i++) {
      (i > pageId) && (comments[i].nick += ' - ' + pageId)
    }
    callback({
      pageCount: 2,
      data: comments
    });
  }
};

module.exports = tacit;