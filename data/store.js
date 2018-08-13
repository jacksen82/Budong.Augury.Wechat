//  data/store.js

const constants = require('constants.js')

module.exports = {
  
  client: {},
  auth: function(session3rd, client){

    this.client = client || {};
    
    constants.APP_3RD_SESSION = session3rd || '';
    constants.CLIENT_ACTIVED = (client || {}).actived || 0;
    wx.setStorageSync('session3rd', (session3rd || ''));
  }
}