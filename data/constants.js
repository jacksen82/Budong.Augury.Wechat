//  data/constants.js

//  常量定义
module.exports = {
  APP_SCENE: 0,                                     //  来源场景值
  APP_QUERY: {},                                    //  启动参数集合
  APP_SHARETICKET: '',                              //  启动群标识
  APP_3RD_SESSION: '',                              //  三方会话标识
  CLIENT_ACTIVED: false,                            //  用户信息是否已激活
  CAPSULE_SMS_PRICE: 0.66,                          //  发送短信价格
  CAPSULE_NOTIFY_PRICE: 6.66,                       //  提醒服务价格
  HTTP_API: 'https://shenxu.name/capsule/api',      //  接口前缀
  HTTP_CDN: 'https://cdn.shenxu.name',              //  CDN 前缀
  AJAX_TIMESTAMP_NORMAL: 6000,
  AJAX_CODE_TYPE: {
    SESSION_NULL: 101,
    SESSION_EXPIRE: 102,
    LOGIN_FAIL: 111,
    UNKONOW: 999
  },
  AJAX_CAPSULE_CHANGED: true,
  AJAX_URL_STATE: {

  }
}
