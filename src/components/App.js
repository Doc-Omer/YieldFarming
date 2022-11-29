import React, {Component} from 'react';
import './App.css';
import Navbar from './Navbar.js';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json';
import RWD from '../truffle_abis/RWD.json'
import DecentralBank from '../truffle_abis/DecentralBank.json'
import Main from './Main.js';
// import ParticleSettings from './ParticleSettings'

class App extends Component {

    async UNSAFE_componentWillMount(){
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3(){
        if(window.ethereum){
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert("No ethereum browser detected. Check out Metamask");
        }
    }

    async loadBlockchainData(){
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({account: account[0]})
        const networkId = await web3.eth.net.getId()

        //load tether contract
        const tetherData = Tether.networks[networkId]
        if(tetherData){
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address) 
            this.setState({tether}) 
            const tetherBalance = await tether.methods.balanceOf(this.state.account).call()
            this.setState({tetherBalance: tetherBalance.toString() })
        } else {
            window.alert('Error! Tether contract not deployed - no network detected');
        }


        //load tether contract
        const rwdData = RWD.networks[networkId]
        if(rwdData){
            const rwd = new web3.eth.Contract(RWD.abi, rwdData.address) 
            this.setState({rwd}) 
            const rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
            this.setState({rwdBalance: rwdBalance.toString() })
        } else {
            window.alert('Error! RWD contract not deployed - no network detected');
        }

        //load DecentralBank contract
        const decentralBankData = DecentralBank.networks[networkId]
        if(decentralBankData){
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address) 
            this.setState({decentralBank}) 
            const stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call()
            this.setState({rwdBalance: stakingBalance.toString() })
        } else {
            window.alert('Error! Decentral Bank contract not deployed - no network detected');
        }

        this.setState({loading: false})
    }

    // two functions: One that stakes and another that unstakes
    // leverage that we ahve already created in our decentralBank Contract - deposit tokens and unstaking
    // all of this for the staking token
    // Deposit tokens TransferFrom
    // function approved transaction Hash.
    //STAKING FUNCTION >> decentralBank.depositTokens(send transactionHash => )

    stakeTokens = (amount) => {
        this.setState({loading: true})
        this.state.tether.methods.approve(this.state.decentralBank._address, amount).send({from: this.state.account}).on('transactionHash', (hash) => {  
            this.state.decentralBank.methods.depositTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
            this.setState({loading: false})
        })
    })
    }

    //Unstake Tokens
    unstakeTokens = () => {
        this.setState({loading: true})
        this.state.decentralBank.methods.unstakeTokens().send({from: this.state.account}).on('TransactionHash', (hash) => {
             this.setState({loading: false})
        })
    }

    constructor(props){
        super(props)
        this.state = {  
            account : '0x0',
            tether: {},
            rwd: {},
            decentralBank: {},
            tetherBalance: '0',
            rwdBalance: '0',
            stakingBalance: '0',
            loading: true
        }
    }

    // Our react Code
    render() {
        let content
        {this.state.loading ? content = 
        <p id='loader' className='text-center' style={{margin:'30px'}}>
            Loading please...</p> : content = <Main
            tetherBalance = {this.state.tetherBalance}
            rwdBalance = {this.state.rwdBalance}
            stakingBalance = {this.state.stakingBalance}
            stakeTokens = {this.stakeTokens}
            unstakeTokens = {this.unstakeTokens}
            />} 

        return (
            <div className='App' style={{position: 'relative'}}>
                <div style={{position: 'absolute'}}> 
                {/* <ParticleSettings/> */}
                </div>
                <Navbar account = {this.state.account}/>
                <div className='container-fluid mt-5'>
                    <div className='row' >
                        <main role='main' className='col-lg-12 ml-auto mr-auto' style={{maxWidth: '600px', minHeight: '100vm'}}> 
                            <div>
                                {content}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;