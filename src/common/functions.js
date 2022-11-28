window.fmk = {
    addHead: () => {
        const header = document.createElement('header');
        const navHeader = document.createElement('nav');
        navHeader.setAttribute('id', 'headerNav');
        const ul = document.createElement('ul');
        ul.setAttribute('id', 'navList');

        const navLinks = [
            {text: "Home", onClick : () => {}},
            {text: "Adicionar livros", onClick : () => {Page.addBook()}},
            {text: "Lista de livros", onClick : () => {Page.bookList()}},
        ]

        navLinks.forEach(page =>{
            const item = document.createElement('li');
            item.textContent = page.text;
            item.addEventListener("click", page.onClick);
            ul.appendChild(item);
        });
        
        navHeader.appendChild(ul);
        header.appendChild(navHeader);
        document.body.appendChild(header);
    },

    pageTitle: (titleContent, titleClass) => {
        const title = document.createElement("h2");
        title.setAttribute('id', titleClass);
        title.textContent = titleContent;
        return title;
    },

    createField: (labelText, inputType = 'text', field) => {
        const fieldElement = document.createElement('fieldset');
        fieldElement.setAttribute('id', field);
        const labelElement = document.createElement('label');
        labelElement.textContent = labelText + ':';

        let inputElement = null;
        if (inputType.toLowerCase() === "textarea") {
            inputElement = document.createElement('textarea');
        } else {
            inputElement = document.createElement('input');
            inputElement.setAttribute('type', inputType);
        }

        fieldElement.append(labelElement, inputElement);

        return {field: fieldElement, input: inputElement};
    },

    createButton: ({text, id, onClick = ()=>{}}) => {
        const buttonElement = document.createElement('button');
        buttonElement.setAttribute('id', id);
        buttonElement.textContent = text;
        buttonElement.addEventListener('click', onClick);

        return buttonElement;
    },

    createElementWithAttribute: (tag, attrType, attrName) => {
        const newElement = document.createElement(tag);
        newElement.setAttribute(attrType, attrName);
        return newElement;
    },

    createTable:(row, tableHead) => {
        const table = document.createElement('table');
        table.setAttribute('class', 'table-books')
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
    
        tableHead.forEach(item => {
            const th = document.createElement('th');
            th.innerText = item;
            th.setAttribute('class', item);
            thead.appendChild(th);
        });
    
        for (let i = 0; i < row.length; i++) {
            const tr = document.createElement('tr');
            for (let j = 1; j < tableHead.length + 1; j++) {
                const td = document.createElement('td');
                const texto = document.createTextNode(Object.values(row[i])[j]);
                td.setAttribute('class', Object.keys(row[i])[j]);
                td.appendChild(texto);
                tr.appendChild(td);
                if (j == tableHead.length) {
                    const buttonsTd = document.createElement('td');
                    const buttonEdit = document.createElement('button');
                    const iconEdit = document.createElement('img');
                    iconEdit.setAttribute('src', './icons/pen.svg');
                    buttonEdit.setAttribute('class', Object.values(row[i])[0]);
                    buttonEdit.appendChild(iconEdit);
                    buttonEdit.setAttribute('onclick', 'EditBook(this.className)');
                    buttonsTd.appendChild(buttonEdit);
                    const buttonDelete = document.createElement('button');
                    const iconDelete = document.createElement('img');
                    iconDelete.setAttribute('src', './icons/trash.svg');
                    buttonDelete.setAttribute('class', Object.values(row[i])[0]);
                    buttonDelete.setAttribute('onclick', 'DeleteBook(this.className)');
                    buttonDelete.appendChild(iconDelete);
                    buttonsTd.appendChild(buttonDelete);
                    tr.appendChild(buttonsTd);
                }
    
            }
            tbody.appendChild(tr);
        }
    
        table.appendChild(thead);
        table.appendChild(tbody);
    
        return table;
    },

    filterByKeyWord: (items, textoBusca) => {
        let filteredItems = items;
        filteredItems = filteredItems.filter(item => item.titulo.toLowerCase().includes(textoBusca.toLowerCase()));
      
        return filteredItems;
      },

    clearTable:() =>{
        const table = document.querySelector('table');
        table.remove();
    },

    recreateTable: (table, items, headNames, tag) => {
        fmk.clearTable();
        table = fmk.createTable(items, headNames);
        tag.appendChild(table);
        return table;
    },

    filterByUid:(items, uid) => {
        let filteredItems = items;
        filteredItems = filteredItems.filter(item => item.uid.toLowerCase().includes(uid.toLowerCase()));
      
        return filteredItems;
      }
}