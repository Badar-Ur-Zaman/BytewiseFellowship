import SearchUsers from './UsersList';
import SearchTodos from './TodoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h2>Higher Order Components</h2>
      <div>
        <SearchUsers />
      </div>
      <div>
        <SearchTodos />
      </div>
    </div>
  );
}

export default App;
