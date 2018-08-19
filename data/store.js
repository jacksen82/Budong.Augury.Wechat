//  data/store.js

const constants = require('constants.js')

const friends = [{
  relateClientId: 1,
  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Fs3GwU6WUX9nqwSiawIicIKuHrnlpQ5J3Y5rMaInbfL1Cb5ffoxDF5lWD5hibgWt0ljfibl8iaib4mYg9wLyWZhac7LA/132'
}, {
  relateClientId: 2,
  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/IujJKkcVyOLsibDtJwQHW6vVBKydedcyqwoLlDF9R9HFJU3SYrpX5QYJwfnE4CIicTXdY2egU1OuMLv8dRXtBQdg/132'
}];

module.exports = {
  
  client: {},
  tacit: {},
  auth: function(session3rd, client){

    this.client = client || {};

    //  补充信息
    this.client.friends = friends;
    
    constants.APP_3RD_SESSION = session3rd || '';
    constants.CLIENT_ACTIVED = (client || {}).actived || 0;
    wx.setStorageSync('session3rd', (session3rd || ''));
  }
}