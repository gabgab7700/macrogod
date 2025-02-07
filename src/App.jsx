import React, { useState, useEffect, useCallback } from 'react';
import MacroList from './components/MacroList';
import MacroEditor from './components/MacroEditor';
import SearchBar from './components/SearchBar';
import SettingsPage from './components/SettingsPage';

const App = () => {
  const [macros, setMacros] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMacro, setSelectedMacro] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [macroTypeFilter, setMacroTypeFilter] = useState('All');
  const [globalLanguage, setGlobalLanguage] = useState('English');
  const [tags, setTags] = useState([
    { id: 1, name: 'Important' },
    { id: 2, name: 'Urgent' },
  ]);
  const [tagFilter, setTagFilter] = useState('All');

  useEffect(() => {
    // Load macros from local storage on initial load
    const storedMacros = localStorage.getItem('macros');
    if (storedMacros) {
      setMacros(JSON.parse(storedMacros));
    } else {
      // Initialize with some default macros if local storage is empty
      setMacros([
        { id: 1, title: 'Greeting Email (EN)', content: 'Hello, how can I help you via email?', description: 'A standard greeting macro for email.', type: ['Email'], language: 'English', tags: [1] },
        { id: 2, title: 'Closing Chat (MY)', content: 'Terima kasih kerana menghubungi kami. Semoga hari anda baik!', description: 'A standard closing macro for chat.', type: ['Chat'], language: 'Malay', tags: [2] },
      ]);
    }
  }, []);

  useEffect(() => {
    // Save macros to local storage whenever the macros state changes
    localStorage.setItem('macros', JSON.stringify(macros));
  }, [macros]);

  const handleUpdateMacro = (updatedMacro) => {
    setMacros(macros.map(macro =>
      macro.id === updatedMacro.id ? updatedMacro : updatedMacro
    ));
    setSelectedMacro(null);
  };

  const handleDeleteMacro = (id) => {
    setMacros(macros.filter(macro => macro.id !== id));
    setSelectedMacro(null);
  };

  const handleSelectMacro = (macro) => {
    setSelectedMacro(macro);
  };

  const filteredMacros = macros.filter(macro => {
    const searchFilter = macro.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      macro.content.toLowerCase().includes(searchTerm.toLowerCase());

    let typeFilter = true;
    if (macroTypeFilter === 'Email') {
      typeFilter = macro.type.includes('Email');
    } else if (macroTypeFilter === 'Chat') {
      typeFilter = macro.type.includes('Chat');
    }

    const languageFilter = macro.language === globalLanguage;

    let tagFilterCheck = true;
    if (tagFilter !== 'All') {
      tagFilterCheck = macro.tags && macro.tags.includes(parseInt(tagFilter));
    }

    return searchFilter && typeFilter && languageFilter && tagFilterCheck;
  });

  const handleSettingsToggle = () => {
    setIsSettingsOpen(!isSettingsOpen);
    setSelectedMacro(null); // Clear selected macro when navigating to settings
  };

  const handleTypeFilterChange = (type) => {
    setMacroTypeFilter(type);
  };

  const handleLanguageToggleChange = () => {
    setGlobalLanguage(globalLanguage === 'English' ? 'Malay' : 'English');
  };

  const handleAddTag = (newTag) => {
    setTags([...tags, newTag]);
  };

  const handleUpdateTag = (updatedTag) => {
    setTags(tags.map(tag => tag.id === updatedTag.id ? updatedTag : tag));
  };

  const handleDeleteTag = (id) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  const handleTagFilterChange = (e) => {
    setTagFilter(e.target.value);
  };

  const handleImportSettings = useCallback((importedSettings) => {
    setMacros(importedSettings.macros || []);
    setTags(importedSettings.tags || []);
  }, []);

  return (
    <div className="container mx-auto p-6 rounded shadow-md bg-secondary text-neutral">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Macro God</h1>

        <div className="flex items-center">
          <span className="mr-2">EN</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={globalLanguage === 'Malay'}
              onChange={handleLanguageToggleChange}
            />
            <span className="slider round"></span>
          </label>
          <span className="ml-2">MY</span>
        </div>

        <button
          className="bg-dark hover:bg-gray-700 text-neutral font-bold py-2 px-4 rounded shadow-md transition duration-300"
          onClick={handleSettingsToggle}
        >
          {isSettingsOpen ? 'Back to Macros' : 'Settings'}
        </button>
      </div>

      {isSettingsOpen ? (
        <SettingsPage
          existingMacros={macros}
          setMacros={setMacros}
          onCancel={() => setIsSettingsOpen(false)}
          globalLanguage={globalLanguage}
          tags={tags}
          setTags={setTags}
          onAddTag={handleAddTag}
          onUpdateTag={handleUpdateTag}
          onDeleteTag={handleDeleteTag}
          onImportSettings={handleImportSettings}
        />
      ) : (
        <>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="mb-4">
            <button
              className={`bg-dark hover:bg-gray-700 text-neutral font-bold py-2 px-4 rounded mr-2 ${macroTypeFilter === 'All' ? 'bg-primary' : ''}`}
              onClick={() => handleTypeFilterChange('All')}
            >
              All
            </button>
            <button
              className={`bg-dark hover:bg-gray-700 text-neutral font-bold py-2 px-4 rounded mr-2 ${macroTypeFilter === 'Email' ? 'bg-primary' : ''}`}
              onClick={() => handleTypeFilterChange('Email')}
            >
              Email
            </button>
            <button
              className={`bg-dark hover:bg-gray-700 text-neutral font-bold py-2 px-4 rounded ${macroTypeFilter === 'Chat' ? 'bg-primary' : ''}`}
              onClick={() => handleTypeFilterChange('Chat')}
            >
              Chat
            </button>
          </div>

          <div className="mb-4">
            <label className="text-neutral mr-2">Filter by Tag:</label>
            <select
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-neutral border-gray-300 focus:ring-primary focus:border-primary text-dark"
              value={tagFilter}
              onChange={handleTagFilterChange}
            >
              <option value="All">All</option>
              {tags.map(tag => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col md:flex-row">
            <MacroList
              macros={filteredMacros}
              onSelectMacro={handleSelectMacro}
              selectedMacroId={selectedMacro ? selectedMacro.id : null}
              tags={tags}
            />
            {selectedMacro && (
              <div className="w-full md:w-2/3 pl-4 text-neutral">
                <h2 className="text-xl font-semibold mb-3">Macro Content</h2>
                <div className="whitespace-pre-line">{selectedMacro.content}</div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
