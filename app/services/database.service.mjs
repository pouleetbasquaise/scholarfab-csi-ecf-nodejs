import { readFile } from 'node:fs/promises'

import sqlite3 from 'sqlite3'

export async function setupDatabase({ filename, schema }) {
    const db = await getDatabase({ filename })
    const sql = await readFile(schema, { encoding: 'utf8' })
    
    await new Promise((resolve, reject) => {
        db.exec(sql, (err) => { (err ? reject : resolve)(err) })
    });

    return db
}

export function getDatabase({ filename }) {
    return new Promise((resolve, reject) => {
        const { Database } = sqlite3
        const db = new Database(filename, (err) => {
            const p = err ? err : db;
            (err ? reject : resolve)(p)
        })
    })
}
