import { useState, useEffect } from 'react';
import { guestbook_anon_backend } from 'declarations/guestbook_anon_backend';

function App() {
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const data = await guestbook_anon_backend.getEntries();
    setEntries(data.reverse()); // latest first
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await guestbook_anon_backend.addEntry(input);
    setInput('');
    fetchEntries();
  };

  const formatTime = (timestamp) => {
    const date = new Date(Number(timestamp / 1000000n));
    return date.toLocaleString();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📜 Anonymous Guestbook</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a message..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      <ul style={styles.list}>
        {entries.map((entry, idx) => (
          <li key={idx} style={styles.listItem}>
            <div>{entry.text}</div>
            <small style={{ fontSize: '0.8rem' }}>{formatTime(entry.timestamp)}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '2rem',
    maxWidth: '600px',
    margin: 'auto',
    background: 'linear-gradient(to right, #90EE90, #4D8A6A)',
    borderRadius: '1rem',
    marginTop: '4rem',
    color: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  input: {
    flex: 1,
    padding: '0.75rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem 1.25rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    background: '#fff',
    color: '#4D8A6A',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    backgroundColor: '#ffffff33',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '0.5rem',
  },
};

export default App;

