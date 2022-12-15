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

    var styleEl = document.createElement('style');
    styleEl.innerHTML = `#conversations img{ 
      float: left; 
      margin-right: 10px; 
    }
    #conversations .p-name{ 
      font-weight: bold; 
    }
    `;
    document.head.appendChild(styleEl);

    const conversationsDiv = document.getElementById('conversations');
    if (!conversationsDiv) {
      console.log('This theme does not support conversations. Add a div with the id conversations to your page.');
      return;
    }

    // let target = 'https://brandontreb.com/65326/';
    let target = encodeURIComponent(window.location.href);

    // conversationsDiv.innerHTML = `
    //   <div class="conversations-loading">
    //     <div class="spinner">Loading...</div>
    //   </div>
    // `;

    conversationsDiv.innerHTML = `
      <form class="webmention-form ui form" action="https://webmention.io/brandontreb.com/webmention" method="post">
      <div class="fields">
        <div class="">
          <label>Have you written a <a href="https://indieweb.org/responses">response</a> to this? Let me know the URL:</label>
          <input type="url" name="source" class="url">
        </div>
        <div class="four wide field">
          <label>&nbsp;</label>
          <input type="submit" class="ui submit button" value="Send Webmention">
        </div>
      </div>
      <div class="status hidden">
        <div class="ui message"></div>
      </div>
      <input type="hidden" name="target" value="${target}">
    </form>
    `

    let url = `https://webmention.io/api/mentions.jf2?target=${target}`
    const response = await fetch(url);
    let data = await response.json();

    if (!data || !data.children || data.children.length === 0) {
      // conversationsDiv.innerHTML = `<p>No replies yet</p>`;
      conversationsDiv.innerHTML = ``;
      return;
    }

    console.log(data.children);

    conversationsDiv.innerHTML = `<br /><hr /><h3>Replies</h3>`;

    data.children.forEach(conversation => {
      let conversationDiv = document.createElement('div');
      conversationDiv.className = 'conversation';
      conversationDiv.innerHTML = `
        <div>
          <img src="${conversation.author.photo}" alt="${conversation.author.name}" width="25" height="25" style="max-width: 30px;" />
          <span class="p-name">${conversation.author.name}</span>
        </div>
        <div>
          <span>${conversation.content.html || conversation.content.text}</span>
        </div>
        <div>
          <span><a href="${conversation['wm-source']}">${conversation.published}</a></span>
        </div>
        `;
      conversationDiv.id = conversation.id;
      conversationsDiv.appendChild(conversationDiv);
    });

  } catch (e) {
    console.log(e);
  }
});