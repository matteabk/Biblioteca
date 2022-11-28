window.Page.addBook = async () => {
    main.innerHTML = '';

    const title = fmk.pageTitle("Adicionar um livro", "addTitle");
    main.appendChild(title);

    const form = document.createElement("form");
    main.appendChild(form);

    const fieldTitle = fmk.createField('Título','text', 'fieldTitle');
    const fieldAuthor = fmk.createField('Autor','text', 'fieldTitle');
    const fieldDesc = fmk.createField('Descrição','textarea', 'fieldTitle');
    const fieldNumber = fmk.createField('Tiragem','number', 'fieldTitle');
    form.append(fieldTitle.field, fieldAuthor.field, fieldDesc.field, fieldNumber.field);

    async function registerBook({tiragem, titulo, autor, descricao}) {
        const body = JSON.stringify({
            aluno: {
                uid: idAluno
            },
            tiragem,
            titulo,
            autor,
            descricao
        });
        ConnectAPI({method: 'POST', service: 'livro', body: body});
        alert('Livro cadastrado!');
    }

    const buttonAdd = fmk.createButton({
        text: 'Adicionar', 
        id: 'btnAdd', 
        onClick: () => {
            registerBook({tiragem: parseInt(fieldNumber.input.value), titulo: fieldTitle.input.value, autor: fieldAuthor.input.value, descricao: fieldDesc.input.value});
        }
    });

    form.appendChild(buttonAdd);
};