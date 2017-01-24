var Account = function(name, amount, password){
  this.accountName = name;
  this.balance = parseFloat(amount);
  this.password = password;
}

var dummyAccount = new Account("User", 20.00, "password");

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
    var name = $("#name").val();
    var password = $("#password").val();

    if (passwordCheck(name, password)) {
      $(".total").text(dummyAccount.balance.toFixed(2));
      $(".balancepane").show();
    } else {
      $(".creationpane").show();
      $(".loginpane").hide();
    }
  })

  $("#add").click(function(){
    dummyAccount.deposit($("#changebalance").val());
    console.log(dummyAccount.balance);
    $(".total").text(dummyAccount.balance.toFixed(2))
  });

  $("#subtract").click(function(){
    dummyAccount.withdraw($("#changebalance").val());
    console.log(dummyAccount.balance);
    $(".total").text(dummyAccount.balance.toFixed(2))
  });

  $("#initial").submit(function(event){
    event.preventDefault();
    var name = $("#name").val();
    var initialDep = parseFloat($("#initial-amount").val());
    var password = $("#password").val();

    var newAccount = new Account(name, initialDep, password);

    console.log(newAccount.accountName + newAccount.balance);

    newAccount.deposit(8);
    console.log(newAccount.balance);

    newAccount.withdrawal(8);
    console.log(newAccount.balance);
  })
})
