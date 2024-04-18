import React = require('react');
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import {
  Heading, Center, Container, ChakraProvider,
} from '@chakra-ui/react';
import { UserContext, AuthUser } from '../context/UserContext';

const rentAFriend = [
  {
    id: 1,
    name: 'Camron C',
    googleId: '101819724799963988372',
    emConName: '',
    emConNum: '',
    currMood: '',
    emConRelationship: '',
    myLocation: '',
    preferredName: '',
    myPhoneNumber: '',
    agee: '',
  },
  {
    id: 2,
    name: "Cam'ron Caldwell",
    googleId: '108335197249965988372',
    emConName: '',
    emConNum: '',
    currMood: '',
    emConRelationship: '',
    myLocation: '',
    preferredName: '',
    myPhoneNumber: '',
    agee: '',
  },
];

async function hashRoom(name1: string, name2: string) {
  const sortedID1 = name1 < name2 ? name1 : name2;
  const sortedID2 = name1 < name2 ? name2 : name1;
  const combinedStr = sortedID1 + sortedID2;

  // turn combined string into array
  const encoder = new TextEncoder();
  const data = encoder.encode(combinedStr);

  // create the hash
  const hashCreation = await crypto.subtle.digest('SHA-256', data);

  // turn into hex
  const hashArray = Array.from(new Uint8Array(hashCreation));
  const hashFinal = hashArray
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  return hashFinal;
}

function Buddy() {
  const userContext = useContext(UserContext);
  const { setUser, user } = userContext;
  // const [buddies, setBuddies] = useState([]);
  const [friends, setFriends] = useState([]);
  const [uniqueStrings, setUniqueStrings] = useState<Record<number, string>>(
    {},
  );
  const [buddiesOnline, setBuddiesOnline] = useState(0);

  useEffect(() => {
    setFriends(rentAFriend);

    axios
      .get('/user')
      .then(({ data }: { data: AuthUser }) => {
        if (typeof data === 'object') {
          const curUser = { ...data };
          setUser(curUser);
          // setBuddies(curUser.buddies);
        }
      })
      .catch((err: Error) => console.error('failed setting user', err));
  }, [setUser]);

  const simulateUserJoin = () => {
    setBuddiesOnline((prevCount) => {
      if (prevCount < 4) {
        return prevCount + 1;
      }
      if (prevCount === 4) {
        return prevCount - 1;
      }
      return prevCount;
    });
  };

  // imitate user joining
  useEffect(() => {
    const interval = setInterval(simulateUserJoin, 2700);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const createRoom = async () => {
      const strings: Record<number, string> = {};
      await Promise.all(
        friends.map(async (friend) => {
          const uniqueString = await hashRoom(user?.name || '', friend.name);
          strings[friend.id] = uniqueString;
        }),
      );
      setUniqueStrings(strings);
    };
    createRoom();
  }, [friends, user?.name]);

  return (
    <ChakraProvider>
      <Center>
        <Heading size="3xl" color="blue.200">
          Buddy
        </Heading>
      </Center>
      <Container maxW="7xl">
        <Heading size="3l" color="blue.200">
          {`Hey ${user?.name.split(' ')[0]}✌️! 
          Here's your buddy for the week:`}
        </Heading>
        <Link to={`/buddychat/soup`}>
          Weekly Buddy Chat
        </Link>
        {buddiesOnline === 0 ? (
          <div>
            <h4>No friends online right now...🫤</h4>
            <h6>
              Do not fret! Any message you send them will be seen when they are
              back online.
            </h6>
          </div>
        ) : (
          <h4>{`You have ${buddiesOnline} buddies online!`}</h4>
        )}
        {/* might need path params? */}
        <div>
          <div>
            {friends.map((friend) => (
              <div key={friend.id}>
                {uniqueStrings[friend.id] && (
                  <Link to={`/buddychat/${uniqueStrings[friend.id]}`}>
                    {friend.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </ChakraProvider>
  );
}

export default Buddy;
