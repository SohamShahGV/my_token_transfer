var web3 = new Web3(window.ethereum);

async function connectMetamask() {
  if (typeof window.ethereum !== "undefined") {
    console.log(window.ethereum.isMetaMask);
    console.log("MetaMask is installed!");
  } else if (typeof window.ethereum === "undefined") {
    document.getElementById("status").innerText = "Install Metamask First";
    alert("You need to install the Metamask first");
    window.open("https://metamask.io/");
  }

  const address = await ethereum.request({ method: "eth_requestAccounts" });

  console.log(address);
  document.getElementById("connected_address").innerText =
    "Your Address is " + address;

  var balance = await web3.eth.getBalance(address[0]);

  console.log(
    "Current Connected Network Balance ---> ",
    balance / 1000000000000000000
  );

  document.getElementById("receiver").innerText = "Your Balance is " + balance;
  document.getElementById("amount").style.visibility = "visible";
  document.getElementById("sendit").style.visibility = "visible";
  document.getElementById("rec").style.visibility = "visible";
  document.getElementById("amt").style.visibility = "visible";

  }

  async function sendit() {
    var ethereum = window.ethereum;
    await ethereum.enable();
    const address = await ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(ethereum);
    try {

      const receiver = document.getElementById("receiver");
      const ethvalue = document.getElementById("amount");
      const finalReceiver = receiver.value;
      try {
        receiver.value;
      } catch (er) {}
      var eth = ethvalue.value;
      if (ethvalue.value < 0) {
        alert("Enter ETH value greater than 0");
      }
      if (receiver.value.toString() === address[0].toString()) {
        alert("Sending ETH to same account is not permitted");
        return;
      }
      console.log("Receiver's Address ---> " + receiver.value);
      console.log("ETH value to be sent ---> ", ethvalue.value);

      console.log("Address of Sender --->  ", address[0]);
      web3.eth.sendTransaction(
        {
          to: finalReceiver,
          from: address[0],
          value: web3.utils.toWei(eth, "ether"),
        },
        function (err, res) {
          console.log("err", err);
          console.log("res", res);
          if (res) {
            document.getElementById("notify").innerText = "HASH " + res;
            alert("Transaction Successful");
          } else {
            document.getElementById("notify").innerText = "Error" + err.message;
            alert("Transaction was cancelled");
          }
        }
      );
    } catch (e) {
      console.log("Error --->> ", e);
      alert(e.message);
    }
  }
