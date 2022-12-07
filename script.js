const bookLIst = document.querySelector('.book-list')
const bookForm = document.querySelector('.book-form')
const container = document.querySelector('.container')

// création de la première classe pas oublier la majuscule par convention de nommage
class Book {
    constructor(titre, auteur, annee) {
        this.titre = titre
        this.auteur = auteur
        this.annee = annee
    }

    // création de la méthode d'ajout de livre
    addBookToList(book) {

        // créer une nouvelle rangée
        const row = document.createElement('tr')

        row.innerHTML = `
        <td>${book.titre}</td>
        <td>${book.auteur}</td>
        <td>${book.annee}</td>
        <td><button class="delete">X</button></td>`;

        bookLIst.appendChild(row)
        
    }

    clearFields() {

        document.getElementById('titre').value = ""
        document.getElementById('auteur').value = ""
        document.getElementById('annee').value = ""

    }

    // alerte de validation
    showAlert(message, className) {

        const alert = document.createElement('div')
        alert.className = `alert ${className}`
        // section 104 13
        alert.appendChild(document.createTextNode(message))
        container.insertBefore(alert, bookForm)

        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 2500)

    }
}

class Interface {

    deleteBook(target) {

        if (target.className === "delete") {
            target.parentElement.parentElement.remove()
        }

    }
}

bookForm.addEventListener('submit', (e) => {
    // evite d'envoyer les données pour rester en local
    e.preventDefault()

    const titre = document.getElementById('titre').value
    const auteur = document.getElementById('auteur').value
    const annee = document.getElementById('annee').value

    // construction du nouvel objet dans lequel on passe les valeurs des inputs
    const book = new Book(titre, auteur, annee)

    if(titre === "" || auteur === "" || annee === "") {
        book.showAlert("Merci de remplir les champs", "error")
    } else {
        book.addBookToList(book)
        book.clearFields()
        book.showAlert("Livre ajouté", "success")
    }

    // ajout à la liste l'objet créé
    book.addBookToList(book)
    // clear les champs après envoi
    book.clearFields()
})

// bookList = tbody. Si on clique dessus et que la target à la calsse delete alors on remove son grand père qui est <tr>
bookLIst.addEventListener('click', (e) => {

    const ui = new Interface()

    ui.deleteBook(e.target)
})