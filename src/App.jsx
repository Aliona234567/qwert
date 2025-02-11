import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [Name, setName] = useState('');
  const [Id, setId] = useState('');
  const [Name1, setName1] = useState(''); 
  

  const fetchData = async () => {
    const res = await axios.get('http://localhost:5000/api/items');
    setItems(res.data);
  };

  const fetchPostApi = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/items', { name: Name }); 
    setItems(res.data);
    setName(''); 
  };

  const fetchPut = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/items/${Id}`, { name: Name1 }); // Use updateId and updateName
    fetchData();
    setId('');
    setName1('');
  };

  const fetchDelete = async (id) => { // Delete function
    await axios.delete(`http://localhost:5000/items/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <form onSubmit={fetchPostApi}>
        <input type="text" value={Name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Добавить</button>
      </form>
      <form onSubmit={fetchPut}>
        <input type="text"  value={Id} onChange={(e) => setId(e.target.value)} />
        <input type="text" value={Name1} onChange={(e) => setName1(e.target.value)} />
        <button type="submit">Поменять</button>
      </form>

      <ul>
        {items.map((el) => (
          <li key={el.id}>
            {el.name}
            <button onClick={() => fetchDelete(el.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;