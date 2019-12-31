import React from 'react';
import {Component} from 'react';
import Render from './render';

export default class Input extends Component {
    constructor(props){
        super(props)
        this.state = {
            l: 0,
            w: 0,
            h: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
       
    }
    handleChange(event) {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount() {
       
    }
    render(){


        const {l, w, h} = this.state;

        return (
          <div className="container">
            <form >
                  <h1>Cube dims</h1>
                <div>
                    <div>
                        length
                    </div>
                    <input type="number" name="l" value={l} onChange={this.handleChange}/>
                </div>
                <div>
                    <div>
                        width
                    </div>
                    <input type="number" name="w" value={w} onChange={this.handleChange}/>
                </div>
                <div>
                    <div>
                        height
                    </div>
                    <input type="number" name="h" value={h} onChange={this.handleChange}/>
                </div>
              </form>
            <Render l = {this.state.l} h = {this.state.h} w = {this.state.w} />
          </div>
        );
    }
}

