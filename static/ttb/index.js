const ScraperUI = class {
    constructor() {
      this.url = 'https://cmp.thruthebible.io/v1/feeds/studies/en_US?order=desc&sort=book_order&offset=0&limit=2000';
      this._init();
    }

    _init() {
      this._fetchData();  
      this._configureSearch();    
    }

    _configureSearch() {
      const searchBox = document.getElementById('query');
      searchBox.addEventListener('keyup', () => {
        this.search();
      });
    }

    _fetchData() {
      // fetch the rss data its in xml format
      fetch(this.url)
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
        const items = data.querySelectorAll("item");
        console.log(items);
        const results = [];
        items.forEach(item => {
          let title = item.querySelector("title") ? item.querySelector("title").innerHTML.replace("<![CDATA[", "").replace("]]>", "") : '';          
          // remove string of the format  | Thru the Bible
          title = title.replace(/\|.*$/, '');
          let description = item.querySelector("description") ? item.querySelector("description").innerHTML.replace("<![CDATA[", "").replace("]]>", "") : '';          
          // remove string of the format [THRU the BIBLE: 2 Kings Study 5 of 14]
          description = description.replace(/\[.*\]/, '');
          results.push({ title, description });
        })        
        this.results = results;
      })
    }    

    _render(data) {
      console.log(data);
      const container = document.querySelector('.results');
      container.innerHTML = '';
      data.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="well search-result">
          <div class="row">
                            
                  <div class="col-xs-6 col-sm-9 col-md-9 col-lg-10 title">
                      <h3>${item.title}</h3>
                      <p onclick="scraperUI.copy(this)" class="result-description">${item.description}</p>
                  </div>
              
          </div>
        </div>  
        `;
        container.appendChild(div);        
      });      
    }    

    copy(ele) {            
      let text = ele.innerHTML;
      navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
        // append a message to the parent element that says "copied to clipboard"
        const parent = ele.parentElement;
        const message = document.createElement('div');
        message.innerHTML = 'Copied to clipboard';
        message.style.color = 'green';
        parent.appendChild(message);
        // remove the message after 2 seconds
        setTimeout(() => {
          parent.removeChild(message);
        }, 2000);
      });      
    }

    search() {
      // get the search box
      const searchBox = document.getElementById('query');
      const query = searchBox.value;

      if(!query || query.length < 1) {
        this._render([]);
        return;
      }
      
      // filter the data based on the query 
      const filteredData = this.results.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
      this._render(filteredData);

    }
}