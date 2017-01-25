var accounts = [];

var Account = function(name, amount, password){
  this.accountName = name;
  this.balance = parseFloat(amount);
  this.password = password;
  accounts.push(this);
}

var accountDropdowner = function(arrayOfAccounts, parentId) {
  $(parentId).empty();

  for (var i = 0; i < arrayOfAccounts.length; i++) {
    var accountOption = document.createElement('option');
    accountOption.innerHTML = arrayOfAccounts[i].accountName;
    $(parentId).append(accountOption);
  }
}

var dummyAccount = new Account("Dummy Account", 20.00, "password");

var passwordCheck = function(account, password) {
  if (account === dummyAccount.accountName && password === dummyAccount.password) {
    return true;
  } else {
    return false;
  }
}

Account.prototype.deposit = function(amount) {
  this.balance += parseFloat(amount);
}

Account.prototype.withdraw = function(amount) {
  this.balance -= parseFloat(amount);
}

$(function() {
  var currentAccount = dummyAccount;
  $("#login").submit(function(event){
    event.preventDefault();
    var name = $("#loginname").val();
    var password = $("#loginpassword").val();

    if (passwordCheck(name, password)) {
      $(".total").text(dummyAccount.balance.toFixed(2));
      $(".balancepane").show();
    } else {
      $(".creationpane").show();
      $(".loginpane").hide();
    }

    $("#loginname").val("");
    $("#loginpassword").val("");
  });

  $("#add").off().click(function(){
    currentAccount.deposit($("#changebalance").val());
    $(".total").text(currentAccount.balance.toFixed(2))
  });

  $("#subtract").off().click(function(){
    currentAccount.withdraw($("#changebalance").val());
    $(".total").text(currentAccount.balance.toFixed(2));

  });

  $("#initial").submit(function(event){
    event.preventDefault();
    var name = $("#name").val();
    var initialDep = parseFloat($("#initial-amount").val());
    var password = $("#password").val();
    var newAccount = new Account(name, initialDep, password);
    currentAccount = newAccount;
    accountDropdowner(accounts, '#account-dropdown');

    $(".total").text(newAccount.balance.toFixed(2));
    $(".balancepane").show();


    $("#gotoaccount").click(function(){
      var selectedAccount = $("#account-dropdown").val();

      for (var i = 0; i < accounts.length; i++){
        if (accounts[i].accountName === selectedAccount) {
          $(".total").text(accounts[i].balance.toFixed(2));
          currentAccount = accounts[i];
        };
      };
    });
  });

})
