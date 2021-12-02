/**
 * log 函数
 * @return {none} 
 */
var log = function () {
  console.log.apply(console, arguments)
}

/**
 * e 选择元素函数
 * @param  {CSS选择器} selector 
 * @return {DOM元素} 
 */
var e = function (selector) {
  return document.querySelector(selector)
}

/**
 * es 选择所有元素函数
 * @param  {CSS选择器} selector 
 * @return {DOM元素集合} 
 */
var es = function (selector) {
  return document.querySelectorAll(selector)
}


/**
 * 插入 html 函数
 * @param  {DOM元素} element 用来定位的 DOM 元素
 * @param  {模板变量} html 一般用模板字符串
 * @return {none} 
 */
var appendHtml = function (element, html) {
  element.insertAdjacentHTML('beforeend', html)
}

/**
 * 单个元素绑定事件函数
 * @param  {DOM元素} element 被绑定事件的元素
 * @param  {事件名称} eventName click等
 * @param  {回调函数} callback 
 * @return {none} 
 */
var bindEvent = function (element, eventName, callback) {
  element.addEventListener(eventName, callback)
}

/**
 * 所有相同类名元素绑定事件函数
 * @param  {CSS选择器} selector 
 * @param  {事件名称} eventName 
 * @param  {回调函数} callback 
 * @return {none} 
 */
var bindAll = function (selector, eventName, callback) {
  var elements = document.querySelectorAll(selector)
  for (var i = 0; i < elements.length; i++) {
    var e = elements[i]
    bindEvent(e, eventName, callback)
  }
}

/**
 * 多个不同元素绑定事件函数
 * @param  {arr} elemArr DOM 元素类数组
 * @param  {事件名称} eventName 
 * @param  {回调函数} callback 
 * @return {none} 
 */
var bindLots = function (elemArr, eventName, callback) {
  for (var i = 0; i < elemArr.length; i++) {
    elemArr[i].addEventListener(eventName, callback)
  }
}

/**
 * 切换类名函数
 * @param  {DOM元素} element 
 * @param  {类名} className 
 * @return {none} 
 */
var toggleClass = function (element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className)
  } else {
    element.classList.add(className)
  }
}

/**
 * 移除所有类名函数(先查找到含有该类名的所有元素，然后移除掉元素上的该类名)
 * @param  {类名} className 
 * @return {none} 
 */
var removeClassAll = function (className) {
  var selector = '.' + className
  var elements = document.querySelectorAll(selector)
  for (var i = 0; i < elements.length; i++) {
    var e = elements[i]
    e.classList.remove(className)
  }
}

// find 函数可以查找 element 的所有子元素
var find = function (element, selector) {
  return element.querySelector(selector)
}



// ------------- Start -------------
//           事件相关的函数

// 封装兼容性好的 addEvent 函数
function addEvent(elem, type, handle) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handle, false)
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + type, function () {
      handle.call(elem)
    })
  } else {
    elem['on' + type] = handle
  }
}

// 封装兼容性好的 removeEvent 函数
function removeEvent(element, type, handler) {
  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent("on" + type, handler);
  } else {
    element["on" + type] = null;
  }
}

// 封装兼容性好的 stopBubble 函数
function stopBubble(event) {
  if (event.stopPropagation) {
    event.stopPropagation()
  } else {
    event.cancelBubble = true
  }
}

// 封装兼容性好的 cancelDefault 函数
function cancelDefault(event) {
  if (event.preventDefault) {
    event.preventDefault()
  } else {
    event.returnValue = false
  }
}

// 封装 getStyle 获取元素属性的函数
function getStyle(elem, prop) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(elem, null)[prop]
  } else {
    return elem.currentStyle[prop]
  }
}

// 拖拽函数
function drag(elem) {
  var disX,
    disY;
  addEvent(elem, 'mousedown', function (e) {
    var event = e || window.event
    disX = event.clientX - parseInt(getStyle(elem, 'left'))
    disY = event.clientY - parseInt(getStyle(elem, 'top'))
    addEvent(document, 'mousemove', mouseMove)
    addEvent(document, 'mouseup', mouseUp)
    stopBubble(event)
    cancelDefault(event)
  })
  function mouseMove(e) {
    var event = e || window.event
    elem.style.left = event.clientX - disX + 'px'
    elem.style.top = event.clientY - disY + 'px'
  }
  function mouseUp(e) {
    var event = e || window.event
    removeEvent(document, 'mousemove', mouseMove)
    removeEvent(document, 'mouseup', mouseUp)
  }
}

// 多物体多值链式运动框架
function startMove(obj, json, callback) {
  clearInterval(obj.timer)
  var iSpeed, iCur
  obj.timer = setInterval(function () {
    var bStop = true
    // 遍历属性集合
    for (var attr in json) {
      if (attr == 'opacity') {
        iCur = parseFloat(getStyle(obj, attr)) * 100
      } else {
        iCur = parseInt(getStyle(obj, attr))
      }
      iSpeed = (json[attr] - iCur) / 7
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
      if (attr == 'opacity') {
        obj.style.opacity = (iCur + iSpeed) / 100
      } else {
        obj.style[attr] = iCur + iSpeed + 'px'
      }
      if (iCur != json[attr]) {
        bStop = false
      }
    }
    // 停止
    if (bStop) {
      clearInterval(obj.timer)
      typeof callback === 'function' ? callback() : ''
    }
  }, 30)
}


/**
 * 取到顶层对象函数
 * @return {window} window 等顶层对象
 */
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};

//           事件相关的函数
// ------------- End -------------

/**
 * 获取当前时间函数
 * @return {[type]} [description]
 */
var getCurrentTime = function () {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minu = date.getMinutes()
  let second = date.getSeconds()
  // 判断是否满 10
  let arr = [month, day, hours, minu, second]
  arr.forEach(item => {
    item < 10 ? "0" + item : item
  })
  // console.log(`${year}年/${month}月/${day}日 ${hours}时/${minu}分/${second}秒`)
  return `${year}年/${month}月/${day}日 ${hours}时/${minu}分/${second}秒`
}

// 封装 ajax 函数
function ajaxFunc(method, url, header, data, callback) {
  var xhr = null
  method = method.toUpperCase()
  // 创建 ajax 对象
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHttp')
  }
  // 判断方法
  if (method == 'GET') {
    xhr.open(method, url + '?' + data, true)
    xhr.send()
  } else if (method == 'POST') {
    xhr.open(method, url, true)
    // xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('content-type', header)
    xhr.send(data)
  }
  // 监听状态
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        callback(xhr.responseText)
      }
    }
  }
}
