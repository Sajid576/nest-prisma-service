const moment = require('moment-timezone');

const DATE_FORMAT = {
  DATETIME_GENERAL_TABLE: 'YYYY, MMMM Do, h:mm:ss a',
  DATE_REPORT: 'DD-MMMM-YYYY',
  YEAR_MM: 'YYYY-MM',
  DATETIME_FILE_NAME: 'YYYY-MM-DD-HH-mm-ss',
  YEAR_MM_DD: 'YYYY-MM-DD',
  DATETIME_INPUT_HTML: 'YYYY-MM-DDTHH:mm:ss',
};

export = {
  DATE_FORMAT,

  formatDateTime: (serverDatetime: any, format: string) => {
    return moment.tz(serverDatetime, 'Asia/Dhaka').format(format);
  },

  daysBetweenDates: (startDate: any, endDate = new Date()) => {
    return moment(endDate).diff(startDate, 'days');
  },

  getStartOfCurrentDate: (date: any) => {
    let currentDate = null;

    if (!date) currentDate = new Date();
    else currentDate = new Date(date);

    currentDate.setHours(0, 0, 0, 0);

    return currentDate;
  },

  getEndOfCurrentDate: (date: any) => {
    let currentDate = null;

    if (!date) currentDate = new Date();
    else currentDate = new Date(date);

    currentDate.setHours(23, 59, 59, 999);

    return currentDate;
  },

  isSameDate: (date1: any, date2: any) => {
    const formattedDate1 = moment
      .tz(date1, 'Asia/Dhaka')
      .format('YYYY-MM-DD')
      .split('-')[2];

    const formattedDate2 = moment
      .tz(date2, 'Asia/Dhaka')
      .format('YYYY-MM-DD')
      .split('-')[2];

    return formattedDate1 === formattedDate2;
  },

  getFormattedCurrentDatetime: (format: string = DATE_FORMAT.DATE_REPORT) =>
    moment().tz('Asia/Dhaka').format(format),

  isDateExpired: (date: any) => {
    var dateToCompare = moment(date);
    var now = moment();

    if (now > dateToCompare) {
      return true;
    } else {
      return false;
    }
  },

  isDateLess: (then: any, now: any) => {
    var before = moment(then);
    var after = moment(now);

    if (after < before) return true;

    return false;
  },

  addDays(date: any, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);

    return result;
  },
};
