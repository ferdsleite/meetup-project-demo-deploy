import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import Head from 'next/head';

function NewMeetupPage() {
    const router = useRouter();
    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        router.push('/');
    }

    return (
    <>
    <Head>
        <title>Add a New Meetup</title>
        <meta name="description" content="A huge amount of new meetups from all around the world."/>
        <meta name="author" content="Fernanda Leite" />
    </Head>
    <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
    )
}

export default NewMeetupPage;