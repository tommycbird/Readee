// Client-side script.js
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('gptForm').addEventListener('submit', function(event) {
      event.preventDefault(); 
  
      const word = document.getElementById('word').value;
      const sentence = document.getElementById('sentence').value
      const context = document.getElementById('context').value;
    
      checkGPT(word, sentence, context)
      fetchDefGPT(word, sentence);
    });
  });
  