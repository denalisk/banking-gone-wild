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
    $("#add").click(function(){
      dummyAccount.deposit($("#changebalance").val());
      $(".total").text(dummyAccount.balance.toFixed(2))
    });

    $("#subtract").click(function(){
      dummyAccount.withdraw($("#changebalance").val());
      $(".total").text(dummyAccount.balance.toFixed(2))
    });
    console.log(accounts);
  })

  $("#initial").submit(function(event){
    event.preventDefault();
    var name = $("#name").val();
    var initialDep = parseFloat($("#initial-amount").val());
    var password = $("#password").val();

    var newAccount = new Account(name, initialDep, password);

    accountDropdowner(accounts, '#account-dropdown');

    $(".total").text(newAccount.balance.toFixed(2));
    $(".balancepane").show();

    $("#add").click(function(){
      newAccount.deposit($("#changebalance").val());
      $(".total").text(newAccount.balance.toFixed(2))
    });

    $("#subtract").click(function(){
      newAccount.withdraw($("#changebalance").val());
      $(".total").text(newAccount.balance.toFixed(2))
    });

    console.log(accounts);
    console.log(accounts[1].accountName);

    $("#gotoaccount").click(function(){
      var selectedAccount = $("#account-dropdown").val();

      for (var i = 0; i < accounts.length; i++){
        if (accounts[i].accountName === selectedAccount) {
          $(".total").text(accounts[i].balance.toFixed(2));
        }
      }

    })
  });


})
