;(function () {
  function loadIframe() {
    window.Grnhse.Iframe.load()
  }

  function whenReady(name, callback) {
    var interval = 10
    window.setTimeout(function () {
      if (window[name]) {
        callback(window[name])
      } else {
        window.setTimeout(arguments.callee, interval)
      }
    }, interval)
  }

  whenReady('Grnhse', loadIframe)
})()
