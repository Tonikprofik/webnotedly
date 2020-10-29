import React,{ useEffect} from 'react'
import { useMutation, gql } from '@apollo/client'

import NoteForm from '../components/NoteForm'

import {GET_NOTES, GET_MY_NOTES} from '../gql/query'

const NEW_NOTE = gql`
    mutation newNote($content: String!) {
        newNote(content: $content) {
            id
            content
            createdAt
            favoriteCount
            favoritedBy {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`;

const NewNote = (props) => {
    useEffect(() => {
        document.title = 'New Note - Notedly';
    });

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        // refetch the GET_NOTES query to update the cache
        refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES}],
        onCompleted: data => {
            //when complete, redirect user to note page 
            props.history.push(`note/${data.newNote.id}`);
        }
    });

    return (
        <React.Fragment>
            {/* display loading message as mutation loads */}
            {loading && <p> Loading...</p>}
            {error && <p>Error saving the note</p>}
            {/* form component passes mutation data as prop */}
            <NoteForm action={data}/>
        </React.Fragment>
    );
};

export default NewNote;


