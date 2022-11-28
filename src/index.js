(() => {
    window.Page = {};

    for (const file of [
      "common/functions",
      "common/API",
      "common/connectCSS",
      "pages/createBooks/addBook",
      "pages/bookLists/bookList",
      ]) {
        const script = document.createElement("script");
        script.setAttribute("src", `${file}.js`);
        document.head.appendChild(script);
      }

      addEventListener('load', () =>{
        fmk.addHead();
        window.main = document.createElement('main');
        document.body.appendChild(main);

        CallCSS("./pages/createBooks/addBook.css");
        CallCSS("./pages/bookLists/bookLists.css");
        CallCSS('././styles.css');
      })
})();