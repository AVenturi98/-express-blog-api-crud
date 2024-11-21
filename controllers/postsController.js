/*

Esercizio
Milestone 1

Come prima cosa, creiamo un controller per i nostri post, in una cartella controllers.

All’interno, prepariamo tutte le funzioni necessarie e copiamo in ciascuna la logica delle funzioni che attualmente si trovano nel router (al momento restituiscono solo dei messaggi).

Poi torniamo sul file delle rotte.

Qui importiamo le funzioni dichiarate nel controller e le associamo alle varie rotte, come visto in classe.

Testiamo su postman se chiamando gli endpoint riceviamo effettivamente le stesse risposte che avevamo prima.

Se tutto funziona, passiamo alla prossima milestone

Milestone 2
Per iniziare, creiamo una cartella data in cui creare un file che contenga ed esporti l’array di posts che trovate in allegato. Importiamo questo file in cima al controller.

Ora passiamo ad implementare le logiche delle nostre CRUD:

Index dovrà restituire la lista dei post in formato JSON

Show dovrà restituire un singolo post in formato JSON

Destroy dovrà eliminare un singolo post dalla lista, stampare nel terminale (console.log) la lista aggiornata, e rispondere con uno stato 204 e nessun contenuto.

Bonus

Implementare un filtro di ricerca nella index che mostri solo i post che hanno un determinato Tag

In Index e Destroy, controllare se il parametro si riferisce ad un post esistente, in caso contrario, rispondere con uno stato 404 e un messaggio d’errore, sempre in formato JSON.

Sia per la show che per la destroy fate funzionare le due API anche quando viene inviato come parametro :id lo slug del post (senza registrare nuove rotte)

Buon Lavoro e buon divertimento

*/
const posts = require('../data/posts');

function index(req, res) {

    console.log(`Lista dei post`)
    res.json(posts)
}

function show(req, res) {

    const id = +req.params.id
    const post = posts.find((el) => el.id === id)
    console.log(`Elemento del post: ${id}`)
    res.json(post)
}

function post(req, res) {

    res.send('Creo un nuovo elemento del post')
}

function update(req, res) {

    const id = +req.params.id
    const post = posts.find((el) => el.id === id)
    console.log(`Aggiorno l\'elemento del post: ${id}`)
    res.json(post)
}

function modify(req, res) {
    
    const id = +req.params.id
    const post = posts.find((el) => el.id === id)
    console.log(`Modifico l\'elemento del post: ${id}`)
    res.json(post)
}

const destroy = (req, res) => {
    
    const id = +req.params.id
    // const post = posts.find((el) => el.id === id)
    console.log(`Cancella l\'elemento del post: ${id}`)
    // res.json(post)

    const postIndex = posts.findIndex((post) => post.id === id)

    if (postIndex === -1) {
        
        res.status(404)
        return res.json({
            error: 'Post not found',
            message: 'Il post non è stato trovato'
        })

    } 

    res.sendStatus(204)

    posts.splice(postIndex, 1)
    console.log(posts)
}

module.exports =  { index, show, post, update, modify, destroy }