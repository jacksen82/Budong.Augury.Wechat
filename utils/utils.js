//  utils/utils.js

module.exports = {

  isMobile: function(mobile){

    if (mobile){

      mobile = parseInt(mobile);

      if (mobile > 10000000000 && mobile < 19900000000){
        if ([130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 147, 150, 151, 152, 153, 155, 156, 157, 158, 159, 180, 187, 188, 185, 186, 189]
              .indexOf(Math.floor(mobile / 100000000)) > -1){
          return true;
        }
      }
    }
    return false;
  },

  getDateAfter: function (dateString){

    var today = new Date();
    var date = this.getDate(dateString);
    var years = date.getFullYear() - today.getFullYear();
    var months = years * 12 - today.getMonth() + date.getMonth();
    var days = Math.floor((today.getDate() - date.getDate()) / 24 / 60 / 60 / 1000);

    if (years > 1){
      return years + '年后';
    } else if (years > 0){
      return '明年' + (date.getMonth() + 1) + '月';
    } else if (months >0 ){
      return months + '个月后';
    } else {
      return days + '天后';
    }
  },

  getDate: function (dateString, def) {

    var dateArray = dateString.split('-');
    if (dateArray.length == 3){
      return new Date(parseInt(dateArray[0], 10), parseInt(dateArray[1]) - 1, parseInt(dateArray[2]));
    } else {
      return new Date(parseInt(dateString.replace('/Date(', '').replace(')/', ''), 10));
    }
    return def || new Date();
  },

  toDate: function(date){

    return date.getFullYear() + '-' +
      (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' +
      (date.getDate() > 9 ? date.getDate() : '0' + date.getDate());
  },

  addYear: function(date, years){

    return new Date(date.getFullYear() + years, date.getMonth(), date.getDate());
  }
}
