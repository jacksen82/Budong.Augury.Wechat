// services/client.js

const constants = require('../data/constants.js')
const store = require('../data/store.js')
const ajax = require('../utils/ajax.js')

const tacit = {

  /*
    说明：获取全部题目
  */
  questions: function(callback){

    callback({
      code: 0,
      data: {

      }
    });
  }
};

module.exports = tacit;