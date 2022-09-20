import React, { useState } from 'react';

export default function CreateUser() {
    const [handle, setHandle] = useState("");
    const [rating, setRating] = useState(0);
    const [rank, setRank] = useState("");

    function onChangeHandle(e) {
        setHandle(e.target.value);
    }
    function onChangeRating(e) {
        setRating(e.target.value);
    }
    function onChangeRank(e) {
        setRank(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();

        const user = {
            handle: handle,
            rating: rating,
            rank: rank
        }

        console.log(user)
    }
}