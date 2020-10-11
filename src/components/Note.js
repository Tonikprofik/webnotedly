import { checkFetcher } from '@apollo/client';
import React from 'react'
import ReactMarkDown from 'react-markdown';
import {format} from 'date-fns';
import styled from 'styled-components';

const StyledNote = styled.article`
    max-width: 800px;
    margin: 0 auto;    
`;

const MetaData = styled.div`
    @media (min-width:500px) {
        display: flex;
        align-items: top;
    }
`;
//space between avatar and meta info
const MetaInfo =styled.div`
    padding-right: 1em;
`;
// align UserActions to tyhe right on large screens
const UserActions = styled.div`
    margin-left: auto;
`;

const Note = ({ note }) => {
    return (
        <article>
            <img src={note.author.avatar}
                 alt="{note.author.username} avatar"
                 heigh="50px"
            />{' '}
            {format(note.createdAt, 'MMM Do YYYY')} Favorites:{' '}
            {note.author.username} {note.createdAt} {note.favoriteCount} {' '}
            <ReactMarkDown source={note.content} />
        </article>
    );
};

export default Note;