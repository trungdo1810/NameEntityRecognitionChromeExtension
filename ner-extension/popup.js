document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('scan-btn').addEventListener('click', function () {
    chrome.tabs.executeScript({
      code: 'window.getSelection().toString();'
    }, function (selection) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }


      if (selection && selection[0].length > 0) {
        console.log(2);
        const selectedText = selection[0];

        

        chrome.runtime.sendMessage(
          {topic: selectedText},
          function(response) {
            let result = response.farewell;


            const highlightedText = highlightWordInText({
              text: selectedText,
              wordPER: result.per_words,
              wordORG: result.org_words
            });
            
            console.log(highlightedText);
            
            document.getElementById('textShowArea').innerHTML = highlightedText;
            // const highlightORGWord = result.org_words;
            // const highlightedText = highlightORGWordInText(selectedText, highlightORGWord); 
            // document.getElementById('textShowArea').innerHTML = highlightedText;
        });

        
      } else {
        document.getElementById('textShowArea').innerText = 'No text selected.';
      }
    });
  });

  function highlightWordInText({text, wordPER, wordORG}) {
    let highlightedText = text;
    
    if (wordPER.length > 0) {
      for (let i = 0; i < wordPER.length; i++) {
        console.log(i);
        console.log(wordPER[i]);
        const regex1 = new RegExp(wordPER[i], 'gi');
        highlightedText = highlightedText.replace(regex1, match => `<span style="background-color: #90EE90">${match}</span>`);
      }      
    }

    if (wordORG.length > 0) {
      for (let i = 0; i < wordORG.length; i++){
        const regex2 = new RegExp(wordORG[i], 'gi');
        highlightedText = highlightedText.replace(regex2, match => `<span style="background-color: yellow">${match}</span>`);
      }
    }
    return highlightedText;
  }

});

