const urlBase = 'http://livros.letscode.dev.netuno.org:25390/services/';
const idAluno = '474ff1b4-6eac-49e0-8ca9-43fae8e3bd5f';

booksBody = JSON.stringify({
  text: '',
  aluno: {
    uid: idAluno,
  },
});

async function ConnectAPI({ method = 'POST', service, body }) {
    try {
      const response = await fetch(`${urlBase}${service}`, {
        method: method.toUpperCase(),
        headers: {
          'Content-Type': 'application/json'
        },
        body,
      });
      if (!response.ok) {
        alert('Ocorreu um erro na comunicação com o servidor!');
        console.error('Ocorreu um erro: ', response);
        return [];
      }
  
      const data = await response.json();
      if (data) {
        return data;
      }
      return;
    } catch (error) {
      console.log('Erro na comunicação:', error);
    }
  };



  async function EditBook(uid) {
    const booksList = await ConnectAPI({ method: 'POST', service: 'livro/lista', body: booksBody});
    const chosenBook = fmk.filterByUid(booksList, uid);

    const editDiv = document.getElementById('edit');
    editDiv.innerHTML = '';
    const idNumber = fmk.createElementWithAttribute('input', 'id', 'number-input');
    const titleInput = fmk.createElementWithAttribute('input', 'id', 'title-input');
    const autorInput = fmk.createElementWithAttribute('input', 'id', 'autor-input');
    const descInput = fmk.createElementWithAttribute('input', 'id', 'desc-input');

    idNumber.value = chosenBook[0].tiragem;
    titleInput.value = chosenBook[0].titulo;
    autorInput.value = chosenBook[0].autor;
    descInput.value = chosenBook[0].descricao;

    const tiragem = parseInt(idNumber.value);

    const editButton = fmk.createButton({
      text: 'Editar', 
      id: 'btnEdit', 
      onClick: () => {callEditService()}});


    async function callEditService() {
        if (idNumber.value.length < 1) {
            window.alert('A tiragem deve ter, pelo menos, um número');
        } else if (titleInput.value.length <= 2) {
            window.alert('O título deve ter, pelo menos, três letras');
        } else if (autorInput.value.length <= 2) {
            window.alert('O nome do autor deve ter, pelo menos, três letras');
        } else if (descInput.value.length <= 2) {
            window.alert('A descrição deve ter, pelo menos, três letras');
        } else if (chosenBook[0].tiragem == idNumber.value && chosenBook[0].titulo == titleInput.value && chosenBook[0].autor == autorInput.value && chosenBook[0].descricao == descInput.value) {
            window.alert('Não há alterações a serem realizadas.');
        } else {
            const body = JSON.stringify({
            uid: chosenBook[0].uid,
            aluno: {
                uid: idAluno
            },
            tiragem: tiragem,
            titulo: titleInput.value,
            autor: autorInput.value,
            descricao: descInput.value
            });
            ConnectAPI({ method: 'PUT', service: 'livro', body });
            window.alert('Categoria alterada com sucesso');
            setTimeout((() => {
                Page.bookList();
            }), 1000);
        }
    }
    editDiv.append(idNumber,titleInput, autorInput,descInput, editButton);
}

async function DeleteBook(uid) {
  if (confirm('Deseja realmente deletar esse livro?')) {
      callDeleteService(uid);
  }
}

async function callDeleteService(uid) {
      const body = JSON.stringify({
          aluno: {
              uid: idAluno,
          },
          uid
      });
      await ConnectAPI({ method: 'DELETE', service: 'livro', body });
      setTimeout((() => {
          Page.bookList();
      }), 1000);
  }