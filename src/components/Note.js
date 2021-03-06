import { checkFetcher } from '@apollo/client';
import React from 'react'
import ReactMarkdown from 'react-markdown';

import { useQuery } from '@apollo/client'
import NoteUser from './NoteUser'
import { IS_LOGGED_IN } from '../gql/query'

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

    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    if(loading) return <p> Loading...</p>;
    if(error) return <p>Sorry, error fetchin data</p>;

    return (
        <StyledNote>
            <MetaData>
                <MetaInfo>
                    <img src={note.author.avatar}
                    alt="{note.author.username} avatar"
                    heigh="50px"
                    />
                </MetaInfo>

                <MetaInfo>
                    <em>by</em> {note.author.username} <br/>
                    {format(note.createdAt,' Do MMM YYYY')}                
                </MetaInfo>
                { data.isLoggedIn ? (
                    <UserActions>
                    <NoteUser note={note}/>
                    </UserActions> 
                ) : (
                    <UserActions>
                        <em>Favorites:</em> {note.favoriteCount}
                    </UserActions>
                )}
            </MetaData>

            <ReactMarkdown source={note.content} />
        </StyledNote>
    );
};

export default Note;