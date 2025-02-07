import React, { useState, useCallback } from 'react';
import MacroEditor from './MacroEditor';
import TagsPage from './TagsPage';

const SettingsPage = ({ existingMacros, setMacros, onCancel, globalLanguage, tags, setTags, onAddTag, onUpdateTag, onDeleteTag, onImportSettings }) => {
  const [activeTab, setActiveTab] = useState('macros');

  const handleExportSettings = useCallback(() => {
    const settings = {
      macros: existingMacros,
      tags: tags,
    };
    const json = JSON.stringify(settings);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link element and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mmboss_settings.json'; // Set the filename for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    URL.revokeObjectURL(url);
  }, [existingMacros, tags]);

  const handleImportSettings = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const settings = JSON.parse(e.target.result);
          onImportSettings(settings);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          alert('Failed to import settings. Invalid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  }, [onImportSettings]);

  return (
    <div className="p-4 text-neutral">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      <div className="flex border-b border-gray-700 mb-4">
        <button
          className={`${activeTab === 'macros' ? 'bg-gray-700 text-neutral' : 'text-gray-400'} py-2 px-4 rounded-t-lg`}
          onClick={() => setActiveTab('macros')}
        >
          Macros
        </button>
        <button
          className={`${activeTab === 'tags' ? 'bg-gray-700 text-neutral' : 'text-gray-400'} py-2 px-4 rounded-t-lg`}
          onClick={() => setActiveTab('tags')}
        >
          Tags
        </button>
      </div>

      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-neutral font-bold py-2 px-4 rounded shadow-md transition duration-300 mr-2"
          onClick={handleExportSettings}
        >
          Export Settings
        </button>
        <label className="bg-green-500 hover:bg-green-700 text-neutral font-bold py-2 px-4 rounded shadow-md transition duration-300 cursor-pointer">
          Import Settings
          <input type="file" className="hidden" accept=".json" onChange={handleImportSettings} />
        </label>
        <button
          className="bg-dark hover:bg-gray-700 text-neutral font-bold py-2 px-4 rounded shadow-md transition duration-300"
          onClick={onCancel}
        >
          Back
        </button>
      </div>

      {activeTab === 'macros' ? (
        <MacroEditorSettings
          existingMacros={existingMacros}
          setMacros={setMacros}
          onCancel={onCancel}
          globalLanguage={globalLanguage}
          tags={tags}
        />
      ) : (
        <TagsPage
          tags={tags}
          setTags={setTags}
          onAddTag={onAddTag}
          onUpdateTag={onUpdateTag}
          onDeleteTag={onDeleteTag}
        />
      )}
    </div>
  );
};

const MacroEditorSettings = ({ existingMacros, setMacros, onCancel, globalLanguage, tags }) => {
  const [draftMacros, setDraftMacros] = useState([...existingMacros.filter(macro => macro.language === globalLanguage)]);
  const [selectedMacroId, setSelectedMacroId] = useState(null);

  return (
    <div>
      <div className="mb-4">
        <button
          className="bg-primary hover:bg-teal-700 text-neutral font-bold py-2 px-4 rounded shadow-md transition duration-300 mr-2"
          onClick={() => {
            const newMacro = {
              id: Date.now(),
              title: '',
              content: '',
              description: '',
              type: [], // Default type
              language: globalLanguage,
              tags: [],
              isNew: true,
            };
            setMacros([...draftMacros, newMacro]);
            setDraftMacros([...draftMacros, newMacro]);
            setSelectedMacroId(newMacro.id);
          }}
        >
          Add Macro
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 pr-4">
          <h3 className="text-lg font-semibold mb-2">Draft Macros</h3>
          <ul>
            {draftMacros.map((macro) => (
              <li
                key={macro.id}
                className={`py-3 px-4 rounded cursor-pointer hover:bg-gray-700 transition duration-300 mb-2 shadow-sm ${selectedMacroId === macro.id ? 'bg-gray-800' : ''} ${macro.isNew ? 'border-2 border-primary' : ''}`}
                onClick={() => setSelectedMacroId(macro.id)}
              >
                <div className="font-bold">{macro.title || 'New Macro'}</div>
                <div className="text-sm">{macro.description}</div>
                <div className="text-xs">Language: {macro.language}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-2/3 pl-4">
          {selectedMacroId && (
            <MacroEditor
              macro={draftMacros.find((macro) => macro.id === selectedMacroId)}
              onUpdateMacro={(updatedMacro) => {
                const updatedDraftMacros = draftMacros.map((macro) =>
                  macro.id === updatedMacro.id ? { ...updatedMacro, isNew: false } : macro
                );
                setDraftMacros(updatedDraftMacros);
                setMacros(existingMacros.map(macro =>
                  macro.id === updatedMacro.id ? updatedMacro : macro
                ));
              }}
              onDeleteMacro={(id) => {
                const updatedDraftMacros = draftMacros.filter((macro) => macro.id !== id);
                setDraftMacros(updatedDraftMacros);
                setMacros(existingMacros.filter(macro => macro.id !== id));
                setSelectedMacroId(null);
              }}
              onCancel={() => setSelectedMacroId(null)}
              tags={tags}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
