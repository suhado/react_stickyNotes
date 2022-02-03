import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NoteList from "./components/NotesList";
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note!",
      date: "27/09/2021"
    },
    {
      id: nanoid(),
      text: "This is my second note!",
      date: "28/09/2021"
    },
    {
      id: nanoid(),
      text: "This is my third note!",
      date: "30/09/2021"
    },
    {
      id: nanoid(),
      text: "This is my new note!",
      date: "30/09/2021"
    }
]);

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem('notes-app-data')
      );

      if(savedNotes) {
        setNotes(savedNotes);
      }
  }, [])

  //Saving to local storage
  useEffect(() => {
    localStorage.setItem(
      'notes-app-data',
      JSON.stringify(notes)
      );
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className='container'>
        <Header handleToggleDarkMode={setDarkMode}/>
        <Search handleSearchNote={setSearchText} />
        <NoteList 
          notes={notes.filter((note) => 
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
    
  )
};

export default App;