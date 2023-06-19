// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

import React, {useState} from 'react'
import SimpleStorage_abi from './contracts/SimpleStorage_abi.json'
import './simplestore.css'
const { ethers } = require("ethers");
const SimpleStorage = () => {

	// deploy simple storage contract and paste deployed contract address here. This value is local ganache chain
	let contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [currentContractVal, setCurrentContractVal] = useState(null);
	const [contract, setContract] = useState(null);

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Disconnect Wallet');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}
    const disconnectWalletHandler = () => {
        // Kullanıcının bağlantısını kesmek için gereken işlemleri burada yapın
        // Örneğin, mevcut hesabı sıfırlayabilir veya diğer gereksinimlere göre işlem yapabilirsiniz
        
        // Örneğin, hesabı null olarak ayarlayabilirsiniz
        accountChangedHandler(null);
        
        // Bağlantı durumu butonunu güncelleyebilirsiniz
        setConnButtonText('Connect Wallet');
      }
	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        console.log("temppsigner")

		let tempSigner = tempProvider.getSigner();
        console.log("tempcontract")

		let tempContract = new ethers.Contract(contractAddress, SimpleStorage_abi, tempSigner);
        
        
		setContract(tempContract);	
        console.log("son")
	}

	const setHandler = (event) => {
		event.preventDefault();
		console.log('sending ' + event.target.setText.value + ' to the contract');
		contract.set(event.target.setText.value);
	}

	const getCurrentVal = async () => {
		let val = await contract.get();
		setCurrentContractVal(val);
	}
	
	return (
		<div className='simplestore'>
		    <h2> {"Get/Set Contract interaction"} </h2>
			<button onClick={connButtonText==="Connect Wallet"?connectWalletHandler:disconnectWalletHandler}>{connButtonText}</button>
			<div>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<form onSubmit={setHandler}>
				<input id="setText" type="text"/>
				<button disabled={connButtonText==="Connect Wallet"?true:false} style={{borderTopLeftRadius:"0",borderBottomLeftRadius:"0"}} type={"submit"}> Update Contract </button>
			</form>
			<div>
			<button disabled={connButtonText==="Connect Wallet"?true:false} onClick={getCurrentVal} style={{marginTop: '5em'}}> Get Current Contract Value </button>
			</div>
			{currentContractVal}
			{errorMessage}
		</div>
	);
}

export default SimpleStorage;