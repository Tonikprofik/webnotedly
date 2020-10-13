import React from 'react';
import ReactMarkDown from 'react-markdown';
import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';
import {useQuery, gql} from '@apollo/client';


const GET_NOTES = gql`
    query NoteFeed($cursor:String) {
        noteFeed(cursor: $cursor) {
            cursor
            hasNextPage
            notes {
                id
                createdAt
                content
                favoriteCount
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`;


const Home = () => {

    const {data, loading, error, fetchMore } = useQuery(GET_NOTES);

    if (loading) {
        return <p>Loading...</p>;
    }

    if(error) return <p>Sorry, error man</p>;

    // if successful, display data in UI
    return (
        // Fragment element to provide a parent element
        <React.Fragment>
            <NoteFeed notes={data.noteFeed.notes} />
            {/* only display the Load More button if hasNextPage is true */}
            {data.noteFeed.hasNextPage && (
                // onClick handler performs a query, passing cursor as variable
                <Button
                    onClick= {() =>
                        fetchMore({
                            variables: {
                                cursor: data.noteFeed.cursor
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                return {
                                    noteFeed: {
                                        cursor: fetchMoreResult.noteFeed.cursor,
                                        hasNext: fetchMoreResult.noteFeed.hasNextPage,
                                        // combine new results and the old
                                        notes: [
                                            ...previousResult.noteFeed.notes,
                                            ...fetchMoreResult.noteFeed.notes
                                        ],
                                        __typename: 'noteFeed'
                                    }
                                };
                            }
                        })}
                >
                Load more
                </Button>
            )}
        </React.Fragment>
    );
};

export default Home;