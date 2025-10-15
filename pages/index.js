import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
    return (
        <>
        <Head>
            <title>React Meetups WebApp</title>
            <meta name="description" content="Web App to browse a huge amount of meetups from all around the world." />
            <meta name="author" content="Fernanda" />
        </Head>
        <MeetupList meetups={props.meetups} />
        </>
    );
}
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     //fetch data from an API or from a file system
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         },
//     }
// }

export async function getStaticProps() {
    //fetch data from an API
    const client = await MongoClient.connect(process.env.MONGODB_URL);

    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();
    
       return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()

            }))
        },
        revalidate: 1
    };
}

export default HomePage;