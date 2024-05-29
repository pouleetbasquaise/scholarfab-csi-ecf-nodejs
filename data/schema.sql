PRAGMA foreign_keys = ON;

create table if not exists users (
    id integer primary key,
    email text not null,
    firstname text not null,
    lastname text not null,
    created_at date default (strftime('%s',datetime('now','localtime')))
);

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

create table if not exists shares (
    id integer primary key,
    note_id integer not null,
    user_id integer not null,
    perm text check(perm in ('ro', 'rw')) not null default 'ro',
    created_at integer default (strftime('%s',datetime('now','localtime'))),
    foreign key (note_id) references notes(id),
    foreign key (user_id) references users(id)
);

-- Unique constraint on users.email
create unique index _I_U_users_email on users(email);

-- Index notes by owner
create index _I_notes_owner_id on notes(owner_id);

-- Unique constraint on shares relation, avoid multiple occurences of same share
create unique index _I_U_shares_user_note on shares(note_id,user_id);

-- Index shares per permission
create index _I_shares_perm on shares(perm);
