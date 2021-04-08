//Imports. Using some helpers from another package.
const exhelp = require("handlebars-helpers").comparison();

module.exports = {
    //Helper to format date and time.
    timeStamp: date => {
        const newDate = new Date(date);
        //  "02/15/1994 at 09:41"
        return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()} at ${newDate.getHours()}:${newDate.getMinutes()}`;
    },
    exhelp
  }