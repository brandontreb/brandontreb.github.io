function loadJSON(file, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', file, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

/* Global variables */
var contractAddress = '0xb6816285c0aB8Eb93e030b7e6D34c1c7306ea238';
var egg = ' 🥚';
var users = [];
var userHash = {};

var eggFuture;
var account;
var totalSupply;
var totalAllocated;

function startApp() {

  initUI();

  /* Reload the page if the user switches accounts */
  account = web3js.eth.accounts[0];
  web3js.eth.defaultAccount = account;

  setInterval(function() {
    if (web3.eth.accounts[0] !== account) {
      account = web3.eth.accounts[0];
      web3js.eth.defaultAccount = account;
      window.location.reload();
    }
  }, 100);

  var abi;
  loadJSON('data/abi.json',function(response) {
    /* Parse JSON string into object */
    var actual_JSON = JSON.parse(response);
    abi = actual_JSON;

    /* Instanciate the contract at a given address */
    var FREggFutureContract = web3js.eth.contract(abi);
    eggFuture = FREggFutureContract.at(contractAddress);

    /* Update the top stats every 5 seconds */
    reloadStats();
    setInterval(function(){
      reloadStats();
    }, 5000);

    /* Reload users every 30 seconds */
    reloadUsers();
    setInterval(function(){
      reloadUsers();
    }, 30000);

    reloadWinners();
    setInterval(function(){
      reloadWinners();
    }, 10000);
});
}

function initUI() {
  var options = {
    noDataText: 'Loading users...'
  };
  $('#table').bootstrapTable({
    "language": {
        "emptyTable":     "My Custom Message On Empty Table"
    }
});
}

function reloadStats() {
  eggFuture.totalSupply(function(err, res){
    totalSupply = res.toNumber();
    $("#total_supply").html(totalSupply.toLocaleString() + egg);
  });
  eggFuture.allocated(function(err, res){
    totalAllocated = res.toNumber();
    $("#total_allocated").html(totalAllocated.toLocaleString() + egg);
    $("#percent_allocated").html((100*(totalAllocated/(totalSupply + totalAllocated))).toFixed(2).toLocaleString() + ' %');
  });
}

function reloadUsers() {
  eggFuture.getUserCount(function(err, res){
    var count = res.toNumber();
    users = [];
    for(i = 0; i < count; i++) {
      eggFuture.getUser(i,function(err, res){
        var user = {
          name: res[0],
          email: res[1],
          balance: res[2].toNumber()
        };
      userHash[user.email] = user;
      users.push(user);
      if(users.length == count) {
        reloadUsersTable(users);
      }
    });
  }
});
}

function reloadWinners() {
  var html = '&nbsp;';
  eggFuture.getWinnersCount((err, res) => {
    var count = res.toNumber();
    var max = count > 5 ? 5 : count;

    for(var i = count; i >= 0; i--) {
      eggFuture.winners(i,(err, res) => {
        var user = userHash[res];
        if(user) {
          html = html + '<span class="col">'+user.name+'!</span>'
          $('#winners').html(html);
        }
      });
    }
  });
}

function reloadUsersTable(data) {
  $('#table').bootstrapTable("load", data);
}

function balanceFormatter(value, row) {
  return value.toLocaleString() + egg;
}

function success(message) {
  $("#success").html('<strong>Success</strong>: ' + message);
  $("#success").show();
  setTimeout(() => {
    $("#success").hide();
  }, 5000);
}

function error(message) {
  $("#error").html('<strong>Error</strong>: ' + message);
  $("#error").show();
  setTimeout(() => {
    $("#error").hide();
  }, 5000);
}

/* Contract functions */
function addUser(name, email, initialBalance, cb) {
  eggFuture.addUser(name, email, initialBalance, function(error, result) {
    console.log("debug: " + JSON.stringify(error));
    console.log("debug: " + JSON.stringify(result));
    if(result) {
      success("Added user - " + name);
    } else {
      error("Add user - " + JSON.stringify(error));
    }
    cb(error,result);
  });
}

function addAdmin(address, cb) {
  eggFuture.addAdmin(address, function(error, result) {
    console.log("debug: " + JSON.stringify(error));
    console.log("debug: " + JSON.stringify(result));
    if(result) {
      success("Added admin - " + address);
    } else {
      error("Added admin " + JSON.stringify(error));
    }
    cb(error,result);
  });
}

function drawUser(amount, cb) {
  eggFuture.drawRandomUser(amount, function(error, result) {
    console.log("debug: " + JSON.stringify(error));
    console.log("debug: " + JSON.stringify(result));
    if(result) {
      success("User drawing started for: " + amount);
    } else {
      error("User drawing: " + JSON.stringify(error));
    }
    cb(error,result);
  });
}

function setUserBalance(email, balance, cb) {
  eggFuture.setUserBalance(email, balance, function(error, result) {
    console.log("debug: " + JSON.stringify(error));
    console.log("debug: " + JSON.stringify(result));
    if(result) {
      success("User balance updated - " + email);
    } else {
      error("User balance update " + JSON.stringify(error));
    }
    cb(error,result);
  });
}
