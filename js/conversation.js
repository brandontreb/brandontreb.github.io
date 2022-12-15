function ready(callback) {
  // in case the document is already rendered
  if (document.readyState != 'loading') callback();
  // modern browsers
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
  // IE <= 8
  else document.attachEvent('onreadystatechange', function() {
    if (document.readyState == 'complete') callback();
  });
}

ready(async() => {
  try {

    const conversationsDiv = document.getElementById('conversations');
    if (!conversationsDiv) {
      console.log('This theme does not support conversations. Add a div with the id conversations to your page.');
      return;
    }

    conversationsDiv.innerHTML = `
      <div class="conversations-loading">
        <div class="spinner">Loading...</div>
      </div>
    `;

    // let target = 'https://brandontreb.com/65326/';
    let target = encodeURIComponent(window.location.href);
    let url = `https://webmention.io/api/mentions.jf2?target=${target}`
    const response = await fetch(url);
    let data = await response.json();

    if (!data || !data.children || data.children.length === 0) {
      // conversationsDiv.innerHTML = `<p>No replies yet</p>`;
      conversationsDiv.innerHTML = ``;
      return;
    }

    console.log(data.children);

    conversationsDiv.innerHTML = `<h3>Replies</h3>`;

    data.children.forEach(conversation => {
      let conversationDiv = document.createElement('div');
      conversationDiv.className = 'conversation';
      conversationDiv.innerHTML = `
        <div>
          <img src="${conversation.author.photo}" alt="${conversation.author.name}" width="30" height="30" style="max-width: 30px;" />
          <span>${conversation.author.name}</span>
        </div>
        <div>
          <span>${conversation.content.html || conversation.content.text}</span>
        </div>
        <div>
          <span><a href="${conversation.source}">${conversation.published}</a></span>
        </div>
        `;
      conversationDiv.id = conversation.id;
      conversationsDiv.appendChild(conversationDiv);
    });

  } catch (e) {
    console.log(e);
  }
});