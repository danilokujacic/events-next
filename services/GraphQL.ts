import { gql } from '@apollo/client';
import { client } from '../client';

export const getEventsForUser = async (userID: string) => {
  const { data } = await client.query({
    query: gql`
      query GetEvents($id: String!) {
        events(filters: { AuthorID: { eq: $id } }) {
          data {
            id
            attributes {
              Title
              StartDate
              EndDate
              AuthorID
              Description
              isArchived
              EventImages {
                data {
                  attributes {
                    url
                    caption
                    name
                  }
                }
              }
              UsersInvolved {
                UserID
              }
            }
          }
        }
      }
    `,
    variables: {
      id: userID,
    },
  });

  return data.events.data;
};

export const getEvents = async () => {
  const { data } = await client.query({
    query: gql`
      query GetEvents {
        events {
          data {
            id
            attributes {
              Title
              StartDate
              EndDate
              AuthorID
              Description
              isArchived
              EventImages {
                data {
                  attributes {
                    url
                    caption
                    name
                  }
                }
              }
              UsersInvolved {
                UserID
              }
            }
          }
        }
      }
    `,
  });

  return data.events.data;
};
