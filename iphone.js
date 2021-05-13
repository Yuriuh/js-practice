function iPhoneVersion() {
  var iHeight = window.screen.height;
  var iWidth = window.screen.width;

  if (iWidth === 414 && iHeight === 896) {
    return "Xmax-Xr";
  }
  else if (iWidth === 375 && iHeight === 812) {
    return "X-Xs";
  }
  else if (iWidth === 320 && iHeight === 480) {
    return "4";
  }
  else if (iWidth === 375 && iHeight === 667) {
    return "6";
  }
  else if (iWidth === 414 && iHeight === 736) {
    return "6+";
  }
  else if (iWidth === 320 && iHeight === 568) {
    return "5";
  }
  return 'none';
}

function isIphone() {
  return !!navigator.userAgent.match(/iPhone/i);
}

if (isIphone() && iPhoneVersion() === "6"){
  //code..
}
