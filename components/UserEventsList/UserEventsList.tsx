import { gql, useQuery } from "@apollo/client"
import Link from "next/link";
import { FunctionComponent } from "react";

const query = gql`
    query getEvents($authorID: String!){
        events(filters: {AuthorID: {eq: $authorID}}){
            data {
                id
                attributes {
                    Title
                }
            }
        }
    }
`

const UserEventsList: FunctionComponent<{id:string}> = ({id}) => {
    const {data, loading,error} = useQuery(query, {
        variables: {
            authorID: id
        }
    });

    return loading ? <p>Loading...</p> : <ul className="p-0">{data.events.data.map((element: {id: string; attributes:  {Title:string}}) => <li key={element.id}><Link href={`/events/${element.id}`}>{element.attributes.Title}</Link></li> )}</ul>
}

export default UserEventsList