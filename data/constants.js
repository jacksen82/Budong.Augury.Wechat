//  data/constants.js

//  常量定义
module.exports = {
  APP_SCENE: 0,                                     //  来源场景值
  APP_QUERY_CID: 0,                                 //  启动来源用户
  APP_SHARETICKET: '',                              //  启动群标识
  APP_3RD_SESSION: '',                              //  三方会话标识
  CLIENT_ACTIVED: false,                            //  用户信息是否已激活
  HTTP_API: 'https://wechat.duomijuan.com/augury/api',//  接口前缀
  HTTP_CDN: 'https://file.duomijuan.com',           //  CDN 前缀
  HTTP_FILE: 'https://wechat.duomijuan.com',           //  CDN 前缀
  AJAX_TIMESTAMP_NORMAL: 6000,
  AJAX_CODE_TYPE: {
    SESSION_NULL: 101,
    SESSION_EXPIRE: 102,
    LOGIN_FAIL: 111,
    UNKONOW: 999
  },
  AJAX_URL_STATE: {

  }
}
