// content.js
let port;

function sendSelectedText(selectedText) {
  if (port) {
    port.postMessage({ action: 'setSelectedText', selectedText: selectedText });
  }
}

document.addEventListener('mouseup', function() {
  var selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    sendSelectedText(selectedText);
  }
});

// Connect to the background script
port = chrome.runtime.connect({ name: 'content-script' });

// Listen for messages from the background script
port.onMessage.addListener(function(request) {
  if (request.action === 'getSelectedText') {
    var selectedText = window.getSelection().toString().trim();
    port.postMessage({ selectedText: selectedText });
  }
});
