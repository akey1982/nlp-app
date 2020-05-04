/**
 * @description validate url data from string
 * @param {string} string to validate 
 */
function urlChecker(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)  
}
export {
  urlChecker
};