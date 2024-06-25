import React from 'react';
import { useCallback, useState } from 'react';
import { shuffle } from '@/utils/shuffle';
import Search from './Search';

const allUsers = ['john', 'alex', 'george', 'simon', 'james'];

function App() {
  const [users, setUsers] = useState(allUsers);

  const handleSearch = useCallback(
    (text) => {
      const filteredUsers = allUsers.filter((user) => user.includes(text));
      setUsers(filteredUsers);
    },
    [] // Dependency array is empty since `allUsers` is a constant and does not change
  );

  return (
    <div className='tutorial'>
      <div className='align-center mb-2 flex'>
        <button onClick={() => setUsers(shuffle(allUsers))}>
          Shuffle
        </button>

        <Search onChange={handleSearch} />
      </div>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
