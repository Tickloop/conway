import App from './app.js';

document.addEventListener('DOMContentLoaded', () => {
    function close_div (e) {
        // close the menu div
        const _body = document.getElementById('menu');
    
        // hide the menu
        _body.style.width = "0px";
    }
    
    function open_div (e) {
        // close the menu div
        const _body = document.getElementById('menu');
        
        // hide the menu
        _body.style.width = "300px";
    }

    // needs to wait for js to be loaded and then run this to create the conway game board
    const app = new App();

    // attach listener to open the sidebar that has all the info
    const open_btn = document.getElementById('open-btn');
    open_btn.addEventListener('click', open_div);

    // attach a listener on the close-btn for sidebar to close the sidebar
    const close_btn = document.getElementById('close-btn');
    close_btn.addEventListener('click', close_div);
});