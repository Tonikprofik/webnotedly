import React from 'react'
import { useQuery, useMutation, gql} from '@apollo/client'

import NoteForm from '../components/NoteForm';
import { GET_NOTE } from '../gql/query'
import { EDIT_NOTE } from '../gql/mutation'

const EditNote = props => {
    // store id found in the url as a variable
    const id = props.match.params.id;

    // define our note query
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

    //fetch current users data
    const { data: userdata } = useQuery(GET_ME);

    if (loading) return 'Loading...';
    if (error) return <p>Sorry. Note not found</p>

    // if current user and note author dont match
    if (userdata.me.id !== data.note.author.id) {
        return <p> Sorry! No access to edit this note</p>;
    }

    //if succeeds, pass data to NoteForm component
    return <NoteForm content = {data.note.content} />;

};

export default EditNote;
