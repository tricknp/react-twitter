import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../index.css';
import { loginUser } from '../services/auth';

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#38435a',
        padding: 20,
        color: 'white',
    },
    center: {textAlign: 'center'},
    submit: {
        padding: '0.85rem',
        border: 'none',
        borderRadius: 0,
        color: '#fff',
        backgroundColor: '#ea454b',
        cursor: 'pointer',
        textDecoration: 'none'
    },
    link: {
        marginTop: 15, 
        color: '#fff', 
        float: 'right'
    }
}

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentWillMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.props.history.push('/timeline');  
        }    
    }

    stateOnChange(key, e) {
        this.setState({
            [key]: e.target.value,
        });
    }

    formSubmit(e) {
        e.preventDefault();
        loginUser(this.state)
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                this.props.history.push('/timeline');  
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="container">
                <form 
                    onSubmit={this.formSubmit.bind(this)}
                    style={styles.form}
                >
                    <h2 style={styles.center}>Entrar</h2>
                    <label htmlFor="name">
                        <span>Email:</span>
                        <input 
                            value={this.state.email} 
                            onChange={this.stateOnChange.bind(this, 'email')} 
                            type="email" placeholder="stranger@things.com"
                            required
                        />
                    </label>
                    <label htmlFor="senha">
                        Senha:
                        <input
                            value={this.state.password}
                            onChange={this.stateOnChange.bind(this, 'password')}
                            type="password"
                            placeholder="******"
                            required
                        />
                    </label>
                    <button 
                        disabled={!this.state.email || !this.state.password} 
                        style={styles.submit} 
                        type="submit"
                    >
                        Entrar
                    </button>
                    <Link style={styles.link} to="/cadastro">Cadastro</Link>
                </form>
            </div>
        );
    }
}
