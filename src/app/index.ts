require('./globalrequires');

jQuery(document).ready(() => {
  let cssurl = _spPageContextInfo.webAbsoluteUrl + "/somepath/style.css";
  jQuery("head").append("<link rel='stylesheet' href='" + cssurl + "' type='text/css' />")
});