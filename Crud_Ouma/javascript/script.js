let stagiaires = []
let isEditing = false;
let editIndex = -1;

const table = document.getElementById("tableStage").getElementsByTagName('tbody')[0]
const formstage = document.getElementById("formAdd")

loadFromLocalStorage();
tableStage();

function loadFromLocalStorage() {
    const storedStagiaires = localStorage.getItem('stagiaires');
    if (storedStagiaires) {
        stagiaires = JSON.parse(storedStagiaires);
    }
}

function saveToLocalStorage() {
    localStorage.setItem('stagiaires', JSON.stringify(stagiaires));
}

function tableStage() {
    table.innerHTML = '';
    stagiaires.forEach((stagiaire, index) => {
        const row = table.insertRow();

        const idCell = row.insertCell(0);
        const numeroCell = row.insertCell(1);
        const nomCell = row.insertCell(2);
        const noteCell = row.insertCell(3);
        const filCell = row.insertCell(4);
        const actionCell = row.insertCell(5);

        idCell.textContent = stagiaire.id;
        numeroCell.textContent = stagiaire.numero;
        nomCell.textContent = stagiaire.nom;
        noteCell.textContent = stagiaire.note;
        filCell.textContent = stagiaire.filiere;

        const modifyB = document.createElement("button");
        modifyB.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" style="color: green;" width="25" height="25" fill="currentColor" class="bi bi-arrow-up-left-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-5.904 2.803a.5.5 0 1 0 .707-.707L6.707 6h2.768a.5.5 0 1 0 0-1H5.5a.5.5 0 0 0-.5.5v3.975a.5.5 0 0 0 1 0V6.707z"/></svg>';
        modifyB.addEventListener('click', () => edite(index));
        modifyB.setAttribute('data-bs-target', '#exampleModalToggle');
        modifyB.setAttribute('data-bs-toggle', 'modal');
        modifyB.setAttribute('class', 'btn btn-link')

        const deleteB = document.createElement("button");
        deleteB.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" style="color: red;" width="25" height="25" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/></svg>';
        deleteB.addEventListener('click', () => deleteS(index));
        deleteB.setAttribute('class', 'btn btn-link')

        actionCell.appendChild(modifyB);
        actionCell.appendChild(deleteB);
    });
}

formstage.addEventListener('submit', function(event) {
    event.preventDefault();

    const num = document.getElementById("num").value;
    const nom = document.getElementById("nom").value;
    const note = document.getElementById("note").value;
    const filiere = document.getElementById("fil").value;

    if (isEditing) {
        // Modifier l'élément existant dans l'array
        stagiaires[editIndex] = { id: stagiaires[editIndex].id, numero: num, nom: nom, note: note, filiere: filiere };
        isEditing = false;  // Réinitialiser le mode édition
        editIndex = -1;     // Réinitialiser l'index de modification
    } else {
        // Ajouter un nouvel élément dans l'array
        stagiaires.push({ id: stagiaires.length, numero: num, nom: nom, note: note, filiere: filiere });
    }

    tableStage();  // Mettre à jour la table
    saveToLocalStorage()
    formstage.reset();  // Réinitialiser le formulaire
});

function edite(index) {
    const stagiaire = stagiaires[index];

    document.getElementById("num").value = stagiaire.numero;
    document.getElementById("nom").value = stagiaire.nom;
    document.getElementById("note").value = stagiaire.note;
    document.getElementById("fil").value = stagiaire.filiere;

    isEditing = true;  // Passer en mode édition
    editIndex = index; // Stocker l'index de la ligne à modifier
    saveToLocalStorage()
}

function deleteS(index) {
    stagiaires.splice(index, 1);  // Supprimer l'élément de l'array
    tableStage();  // Mettre à jour la table
    saveToLocalStorage()
}

document.getElementById('searchButton').addEventListener('click', function() {
    const filiere = document.getElementById('searchFiliere').value;
    rechercheFiliere(filiere);
});

function rechercheFiliere(filiere){
    const stagiairesFiliere = stagiaires.filter(stagiaire => stagiaire.filiere.includes(filiere))
    tableauStagiaireParFiliere(stagiairesFiliere)
}

function tableauStagiaireParFiliere(stagiairesFiliere){
    table.innerHTML = ""
    stagiairesFiliere.forEach((stagiaire,index) => {
        const row = table.insertRow();
        const idCell = row.insertCell(0);
        const numeroCell = row.insertCell(1);
        const nomCell = row.insertCell(2);
        const noteCell = row.insertCell(3);
        const filCell = row.insertCell(4);
        const actionCell = row.insertCell(5);

        idCell.textContent = stagiaire.id;
        numeroCell.textContent = stagiaire.numero;
        nomCell.textContent = stagiaire.nom;
        noteCell.textContent = stagiaire.note;
        filCell.textContent = stagiaire.filiere;

        const modifyB = document.createElement("button");
        modifyB.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" style="color: green;" width="25" height="25" fill="currentColor" class="bi bi-arrow-up-left-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-5.904 2.803a.5.5 0 1 0 .707-.707L6.707 6h2.768a.5.5 0 1 0 0-1H5.5a.5.5 0 0 0-.5.5v3.975a.5.5 0 0 0 1 0V6.707z"/></svg>';
        modifyB.addEventListener('click', () => edite(index));
        modifyB.setAttribute('data-bs-target', '#exampleModalToggle');
        modifyB.setAttribute('data-bs-toggle', 'modal');
        modifyB.setAttribute('class', 'btn btn-link')

        const deleteB = document.createElement("button");
        deleteB.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" style="color: red;" width="25" height="25" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/></svg>';
        deleteB.addEventListener('click', () => deleteS(index));
        deleteB.setAttribute('class', 'btn btn-link')

        actionCell.appendChild(modifyB);
        actionCell.appendChild(deleteB);
    })
        
}