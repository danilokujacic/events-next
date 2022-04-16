import { NextApiRequest, NextApiResponse } from "next"
import { FunctionComponent } from "react"
import CreateEventForm from "../components/CreateEventForm/CreateEventForm"
import checkUserSession from "../utils/Auth0/checkUserSession"

const CreateEvent: FunctionComponent<{user: any}> = ({user}) => {
  return <CreateEventForm user={user} />
}

export default CreateEvent

export const getServerSideProps = async ({req,res}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const session = await checkUserSession(req,res)
  const {user} = session;

  if(!user){
    return {
      redirect: {
        destination: '/login',
        premanent: false
      }
    }
  }
  return {
    props: {
      user
    }
  }
}