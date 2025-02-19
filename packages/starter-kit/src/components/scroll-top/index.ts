export default class ScrollTop extends HTMLElement {
    connectedCallback() {
        this.innerHTML = '↑';
        this.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#333;color:white;padding:10px;cursor:pointer;';
        this.onclick = () => window.scrollTo(0, 0);
    }
}