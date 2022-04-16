import type { NextApiRequest, NextApiResponse } from 'next';
import checkUserSession from '../../utils/Auth0/checkUserSession';
import FirebaseStorage from "multer-firebase-storage";
import { client } from '../../client';

import nextConnect from 'next-connect';
import multer from 'multer';
import { gql } from '@apollo/client';
import moment from 'moment';

const upload = multer({storage: FirebaseStorage({
  bucketName: 'events-345912.appspot.com',
  credentials: {
      clientEmail: 'firebase-adminsdk-8v6d5@events-345912.iam.gserviceaccount.com',
      privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCSvuqb3NTzsLbb\nEBdz1CgzN8DvYYInJZggVXjvQX89zO2+4EzDGI7sV5MIXiob+RRe4KIeFjstTSmU\nOqaor/zP1nSV7T4jcyvCg0hX4qfJinxW0JNR+VBBnfSL4LZi18KlglrrFGEVknDT\n8mW5SGcyisk9q/8GJvj1VL2C9mWsrVkYDmnCKXGMITgYwTMDU0vQjjD0TlDFKelz\n691BqGZaWZDHMqGidADei36GxmNHZy/z16g+8cSg2f8pr9D08Dy139AKT9xSn398\nX467scgorc35Cz+J9W7MaToyfsw02aMt1YT2zUrDQ3QFd4Zo8QnZlzzOcIko/79P\nsgXwRSQHAgMBAAECggEAEuS1bxDXyBz8m1LEj5CwBlF2K+aO1nx0IYGaWu+WCCkY\n2RD8QR1/KqBnLqt1BM9PwfFuXgJNvITpRrY7G+U2CbUE+K1SvpyxnyRo+DZslORu\nzXyi4xR+3UaOzu2afeUP9grvqsGfyE0SQsTm4kaXUX4Qmo9I++FLqhvZdIGbJfKl\nEg+yRYeWNyZP5SKSQ76BnKOnfbCiCf2hIat03uk/J8/wxRskVKgO90yXbHZBIsRJ\n9NJewnzlvbShVJj/mHHQCXckLj6cM1Jm8SHbUGrUQXPDg/4eNn+H9FHb/Rcj8Zmy\n0EDsGVNbh9u4TttAugRAesmABhszwiYHOhILhgGgQQKBgQDE0qI1QztsR+b/hvXn\nm5mZpV998Oz/cWnK0mPs7AA1xKiLz6hrrSsBT9NzO8bg+uT74GaKYyNORCb6Moyi\nQkAsFlgQPUM8uH2vNIAboWmi+IeRHnyXzdqpYqAoLKlOfn2NrMRu8eY9C5cVEb1Z\nLaTBARjZrWcVOcUlbWWBUM1CwQKBgQC+3eA2n3KsO6aOm+c8OdA80OOQgwKBNZUy\nExlvl7+E1K7+iJdCOft3h4ghl0V2xOnSRJzDPRxaKItifspsXBtGe4rLPhC9vc2f\nnCrR2YxNh/i9TwLzV6sRREA+sG3lSg7yxZtSjyqNpdDickWJ8jc6oWM5UWQsFbnk\n+fXmn4ZAxwKBgQCt8PBFXftgAFNXM7CSVOLz9EBmDsuEHHjANBr3QMIWwoups4VG\nU62T5TYbupJSNai0KGa2mlKTUouXxaCfrSkFTWHaSCnpuanpct5cjNPMoRM93tGB\nXv2FgJHFr2KY6hSPZkXbPpCZFmsYxaqu6zWVFCEgDqzxBzMBlqKEHCKqgQKBgFX5\nufLA9jWxFQCuJ4YQgMW0Tp2c9fbf/Rm2UsHauDGMYFtVidUSKz0XdvGyo16xqqXF\ntFuZ3niaRNcUR/hxsPOZ2NZeWcougj5AaWVnunR+KESWH70fo3Y+qTXT4VzkdEFV\nU/bneIKfy60FTl+qFMi7Q+fgyt+01azYD7VX7HCnAoGBALi8Rgp886pKKTc1Xd74\nAWvdUE7oL4xPTsUos6TluPgy7nWIoy8zmTMVbEEEQipi5HiZJ2ZZ6GZe08UwS17E\nZaxbEirrts1DXpzbHX5qOfo7vwbU/TzqoVAuvI3jDWaaWZntkGLMY7y+LVpzVTbk\naQkE6f4iEZgCw1KCozv4IC5j\n-----END PRIVATE KEY-----\n',
      projectId: 'events-345912'
    }
})});

const apiRoute = nextConnect();

type MulterFile = {
  fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    fileRef: any;
    path: string;
    size: number;
}

apiRoute.use(upload.array('files'));

apiRoute.post(async function handler(
  req: NextApiRequest & {
    files: MulterFile[]
  },
  res: NextApiResponse,
) {
  const session = await checkUserSession(req,res);
  if(!session){
      return res.status(403).json({unauthorized: true});
  }
  const {user} = session;

  if(!user){
      return res.status(403).json({unauthorized: true});
  }

  try {
    
    const images = await Promise.all(req.files.map(async (file) => {
      const {metadata} = file.fileRef;
      const [url] = await file.fileRef.getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    });
      const image = await client.mutate({
        mutation: gql` 
        mutation setImage($url: String){
            createUploadFile(data: {
              name: "${metadata.name}"
              url: $url
              mime: "${metadata.contentType}"
              previewUrl: $url
              size: ${metadata.size}
              hash: "${metadata.md5Hash}"
              provider: "google storage"
            }){
              data {
                id
                attributes {
                  url
                }
              }
            }
          }
        `,
        variables: {
          url
        }
      })

      return image.data.createUploadFile.data.id
    }))

    const event = await client.mutate({
      mutation: gql`
        mutation setEvent($uI: [ComponentUsersInvolvedUsersInvolvedInput!], $eI: [ID!]) {
          createEvent(data: {
            Title: "${req.body.title}"
            Description: "${req.body.description}"
            StartDate: "${req.body.startDate}"
            EndDate: "${req.body.endDate}"
            AuthorID: "${user.nickname}"
            EventImages: $eI
            UsersInvolved: $uI
            publishedAt: "${moment().toISOString()}"
          }) {
            data {
              attributes {
                Title
              }
            }
          }
        }
      `,
      variables: {
        uI: Array.isArray(req.body.usersInvolved) ? req.body.usersInvolved.map((userInvolved: string) => {
          return {
            UserID: userInvolved
          }
        }) : [{UserID: req.body.usersInvolved}],
        eI: images
      }
    })


  
  
  
    return res.status(200).json({ success: true, event: event.data.createEvent.data.attributes });
  }catch(err){
    console.error(err)
    return res.status(400).json({error: err});
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

