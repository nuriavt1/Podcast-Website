import React from 'react';
import SavedList from './savedList';

function SavedContent() {

/*
array = []

function saveToLocalStorage(){
    localStorage.setItem('id', 'Bob')
    console.log(localStorage.getItem('name'))
    
    
}
function removeFromLocalStorage(){
    localStorage.removeItem('name')
}
*/





    return (
        <section className="savedContent">
            <h2>My List of Content</h2>
            <SavedList />
        </section>
    );
}

export default SavedContent;
