
//Création nouvelle note dans BDD avec titre, contenu et un propiétaire
export function createNote(db, { title, content, owner_id}) {
    console.log(owner_id)
    return new Promise(async (resolve, reject) => {
        //instruction SQL pour insertion note via promesse asynchrone
        const stmt = db.prepare('INSERT INTO notes(title, content, owner_id) VALUES (?,?,?)')
        stmt.run([ title, content, owner_id ], (err, data) => {
            const p = err ? err : data;
            (err ? reject : resolve)(p)
        })
    })
}
//MAJ note avec nouveau titre, contenue et du propriétaire
export function updateNote(db, { title, content, owner_id}){
    return new Promise(async (resolve, reject) =>{
        //instruction SQL pour insertion note via promesse asynchrone
        const stmt = db.prepare('UPDATE INTO notes(title, content, owner_id) VALUES (?,?,?)')
        stmt.run([ title, content, owner_id ], (err, data) => {
            const p = err ? err : data;
            (err ? reject : resolve)(p)
        })
    })
}

//Lecture note spécifique par son ID
export function readNote(db, { id }){
    return new Promise(async (resolve, reject) =>{
        //instruction SQL pour insertion note via promesse asynchrone
        const stmt = db.prepare(('SELECT * FROM notes WHERE id=?'))
        stmt.get([ id ], (err, data) => {
            const p = err ? err : data;
            (err ? reject : resolve)(p)
        })
    })
}