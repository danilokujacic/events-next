import { UserProfile } from '@auth0/nextjs-auth0';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { FunctionComponent } from 'react'
import UserDisplay from '../../components/UserDisplay';
import getEntity from '../../utils/Auth0/getEntity';

const UserRoute: FunctionComponent<{user: UserProfile}> = ({user}) => {
  return <UserDisplay user={user} />
}

export default UserRoute;

export const getStaticPaths: GetStaticPaths = async () => {
    const users = await getEntity('users');
    return {
        paths: users.map((user: UserProfile) => `/user/${user.nickname}`),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    if(!params || !params.id){
        return {
            props: {
                user: false
            }
        }
    }
    const user = await getEntity(`users`, {nickname: params.id as string});

    return {
        props: {
            user: Array.isArray(user) ? user[0] : false
        }
    }
}