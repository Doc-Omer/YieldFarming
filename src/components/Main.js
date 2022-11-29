import React, {Component} from 'react';
import Tether from '../tether.png'

class Main extends Component {
    // Our react Code
    
    render() {
        return (
            <div id = 'content' className='mt-3' >
                <table className='table text-muted text-center' style={{width:"100%", margin:"auto"}}>
                    <thead>
                        <tr style={{color: 'black'}}>
                            <th scope='col'> Staking Balance </th>
                            <th scope='col'> Reward Balance  </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{color: 'black'}}>
                            <td>{window.web3.utils.fromWei(this.props.rwdBalance, 'Ether')} USDT </td>
                            
                            <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} RWD </td>
                        </tr>
                    </tbody>
                </table>
                <div className='card mb-2' style={{opacity: '0.9'}}>
                    <form 
                    onSubmit={(event) => { 
                        event.preventDefault()
                        let amount 
                        amount = this.input.value.toString()
                        amount = window.web3.utils.toWei(amount, 'Ether')
                        this.props.stakeTokens(amount) 
                    }}
                    className='mb-3 '>
                        <div style={{borderSpace: '0 1em'}}> 
                            <label className='float-left' style={{marginLeft: '15px'  }}><b>Stake Tokens</b></label>
                            <span className='float-right' style={{marginRight: '8px'}}> Balance:  {window.web3.utils.fromWei(this.props.tetherBalance, 'Ether')}</span>
                            <div className='input-group mb-2'>
                                <input ref = {(input) => {this.input = input}} type='text' placeholder='0' style={{marginLeft: '10px', marginTop: '10px'} } required/>
                                <div className='input-group-open'>
                                    <div className='input-group-text' style={{marginTop: '10px'}}>
                                        <img  src={Tether} alt='tether' height='32'/>
                                        USDT  
                                </div>
                                </div>   
                            </div>
                            <button type='submit' className='btn btn-primary btn-lg btn-block'>DEPOSIT</button>
                            
                        </div>
                    </form>
                    <button type='submit' onClick={(event) => {
                        event.preventDefault(
                            this.props.unstakeTokens()
                        )
                    }} className='btn btn-primary btn-lg btn-block'>WITHDRAW</button>
                    <div className='card-body text-center float-middle' style={{color: 'white', backgroundColor: 'black', width: '150px', marginLeft: 'auto', marginRight: 'auto', marginTop: '13px'}}> AIRDROP</div>
                </div>
            </div>
        )
    }
}

export default Main;