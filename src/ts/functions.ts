const arabicNumbers:Array<any> = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
export function convertorPersan( v:any) {
  var chars = v.split('');
  for (var i = 0; i < chars.length; i++) {
    if (/\d/.test(chars[i])) {
      chars[i] = arabicNumbers[chars[i]];
    }
  }
  return chars.join('');
}
export function convertorPrice (labelValue: number) {

  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+9

  ?  ['میلیارد تومان' , convertorPersan(`${(Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2)}`)]
  // Six Zeroes for Millions 
  : Math.abs(Number(labelValue)) >= 1.0e+6

  ? [` میلیون تومان `, convertorPersan(`${(Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2)}`)]
  // Three Zeroes for Thousands
  : Math.abs(Number(labelValue)) >= 1.0e+3

  ? [` هزار تومان `, convertorPersan(`${(Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2)}`)]

  : [` تومان `, convertorPersan(`${Math.abs(Number(labelValue))}`)];
}

export var DateDiff = {
  inHour: function(d1:Date, d2:Date) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();

      return Math.floor((t2-t1)/(3600*1000));
  },

  inDays: function(d1:Date, d2:Date) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();

      return Math.floor((t2-t1)/(24*3600*1000));
  },

  inWeeks: function(d1:Date, d2:Date) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();

      return Math.floor((t2-t1)/(24*3600*1000*7));
  },

  inMonths: function(d1:Date, d2:Date) {
      var d1Y = d1.getFullYear();
      var d2Y = d2.getFullYear();
      var d1M = d1.getMonth();
      var d2M = d2.getMonth();

      return (d2M+12*d2Y)-(d1M+12*d1Y);
  },

  inYears: function(d1:Date, d2:Date) {
      return d2.getFullYear()-d1.getFullYear();
  }
}