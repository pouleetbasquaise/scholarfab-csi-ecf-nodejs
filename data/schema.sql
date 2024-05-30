-- enable foreign key support
pragma foreign_keys = on;

-- users table (for register and login)
create table if not exists users (
    id integer primary key,
    email text not null,
    firstname text not null,
    lastname text not null,
    `password` text not null,
    created_at date default (strftime('%s',datetime('now','localtime')))
);

-- table for notes
create table if not exists notes (
    id integer primary key,
    title text not null,
    content text not null,
    owner_id integer not null,
    archived_at integer default null,
    created_at integer default (strftime('%s',datetime('now','localtime'))),
    updated_at integer default (strftime('%s',datetime('now','localtime'))),
    foreign key (owner_id) references users(id)
);

-- note sharing data
create table if not exists shares (
    id integer primary key,
    note_id integer not null,
    user_id integer not null,
    perm text check(perm in ('ro', 'rw')) not null default 'ro',
    created_at integer default (strftime('%s',datetime('now','localtime'))),
    foreign key (note_id) references notes(id),
    foreign key (user_id) references users(id)
);

-- keygrip uses this table to store and retrieve keys
create table if not exists keys (
    __v text primary key
);

-- Unique constraint on users.email
create unique index if not exists _I_U_users_email on users(email);

-- Index notes by owner
create index if not exists _I_notes_owner_id on notes(owner_id);

-- Unique constraint on shares relation, avoid multiple occurences of same share
create unique index if not exists _I_U_shares_user_note on shares(note_id,user_id);

-- Index shares per permission
create index if not exists _I_shares_perm on shares(perm);
