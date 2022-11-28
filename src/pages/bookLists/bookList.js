window.Page.bookList = async () => {
    main.innerHTML = '';

    const container = fmk.createElementWithAttribute('div', 'class', 'page-container');
    main.appendChild(container);

    const containerSearch = fmk.createElementWithAttribute('div', 'class', 'search-container');
    const searchInput = fmk.createElementWithAttribute('input', 'placeholder', 'Pesquisar por nome..');
    searchInput.setAttribute('class', 'searchInput-books');

    const addButton = fmk.createButton({text: 'Registrar', id: 'btnGoToAdd', onClick: ()=>{Page.addBook()}});

    containerSearch.append(searchInput, addButton);
    container.appendChild(containerSearch);

    const titleDiv = fmk.createElementWithAttribute('div', 'class', 'title-Div');
    container.appendChild(titleDiv);
    const title = fmk.pageTitle("Livros disponíveis", "listTitle");
    titleDiv.appendChild(title)

    const tableContainer = fmk.createElementWithAttribute('div', 'class', 'table-container');
    container.appendChild(tableContainer);

    const tableHeader = ['Tiragem', 'Título', 'Autor', 'Descrição'];
    const books = [];
    const booksList = await ConnectAPI({ method: 'POST', service: 'livro/lista', body: booksBody});

    booksList.forEach(item => {
        books.push({
            uid: item.uid,
            tiragem: item.tiragem,
            titulo: item.titulo,
            autor: item.autor,
            descricao: item.descricao
        })
    });

    let newTable = fmk.createTable(books, tableHeader);
    tableContainer.appendChild(newTable);

    searchInput.addEventListener('keyup', inputText);

    function inputText(e) {
        const filteredBooks = fmk.filterByKeyWord(books, e.target.value);
        fmk.recreateTable(newTable, filteredBooks, tableHeader, tableContainer);
    };

    const editDiv = fmk.createElementWithAttribute('div', 'id', 'edit');
    container.appendChild(editDiv);
};