import React, {Component} from 'react';
import bank from '../bank.png'

class Navbar extends Component {
    // Our react Code
    render() {
        return (
            <nav className='navbar navbar-dark fixed-top p-0' style={{backgroundColor: 'black', height: '50px'}}>
                <a className='navbar-brand col-sm-3 col-md-2 mr-0' style={{color: 'white', fontSize: '22px'}}>  
                <img src={bank} width = '70' height = '40' className='d-inline-block align-top'/> &nbsp;
                DAPP Yield Staking (Decentralized Bank) 
                
                </a>
                <ul className='navbar-nav px-3'>
                    <li className='text-nowrap d-none nav-item d-sm-none d-sm-block'>
                        <small style={{color: 'white', fontSize: '18px'}}>
                            ACCOUNT NUMBER: {this.props.account}
                        </small>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;