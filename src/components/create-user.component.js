import React, { Component } from 'react';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeHandle = this.onChangeHandle.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onChangeRank = this.onChangeRank.bind(this);

        this.state = {
            handle: '',
            rating: 0,
            rank: ''
        }
    }
    
    onChangeHandle(e) {
        this.setState({
            handle: e.target.value
        });
    }
    onChangeRating(e) {
        this.setState({
            rating: e.target.value
        });
    }
    onChangeRank(e) {
        this.setState({
            rank: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            handle: this.state.handle,
            rating: this.state.rating,
            rank: this.state.rank
        }

        console.log(user)
    }
}