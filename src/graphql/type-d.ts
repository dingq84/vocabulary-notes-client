export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  randomNotes?: Maybe<Array<Maybe<Note>>>;
  noteDetail?: Maybe<Note>;
};


export type QueryNoteDetailArgs = {
  noteId: Scalars['Int'];
};

export type Note = {
  __typename?: 'Note';
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  sentences?: Maybe<Array<Maybe<Sentence>>>;
};

export type Sentence = {
  __typename?: 'Sentence';
  meaning: Scalars['String'];
  sentence: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote?: Maybe<Scalars['Boolean']>;
  updateNote?: Maybe<Scalars['Boolean']>;
  addMessage?: Maybe<Scalars['String']>;
};


export type MutationCreateNoteArgs = {
  title: Scalars['String'];
  url: Scalars['String'];
  sentences?: Maybe<Array<Maybe<SentenceInput>>>;
};


export type MutationUpdateNoteArgs = {
  noteId: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  sentences?: Maybe<Array<Maybe<SentenceInput>>>;
};


export type MutationAddMessageArgs = {
  input: Scalars['String'];
};

export type SentenceInput = {
  meaning: Scalars['String'];
  sentence: Scalars['String'];
};
