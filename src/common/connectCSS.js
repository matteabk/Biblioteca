function CallCSS (reference) {
    const link = document.createElement('link')
    SetMultipleAttributes(link, {
        'rel': 'stylesheet',
        'type': 'text/css',
        'href': reference
    })
    document.head.appendChild(link);
}
function SetMultipleAttributes (el, attrs) {
    for (const key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}