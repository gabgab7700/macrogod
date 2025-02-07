import React, { useState, useEffect } from 'react';

const MacroEditor = ({ macro, onUpdateMacro, onDeleteMacro, onCancel, tags }) => {
  const [title, setTitle] = useState(macro.title);
  const [content, setContent] = useState(macro.content);
  const [description, setDescription] = useState(macro.description);
  const [type, setType] = useState(macro.type);
  const [language, setLanguage] = useState(macro.language);
  const [selectedTags, setSelectedTags] = useState(macro.tags || []);

  useEffect(() => {
    setTitle(macro.title);
    setContent(macro.content);
    setDescription(macro.description);
    setType(macro.type);
    setLanguage(macro.language);
    setSelectedTags(macro.tags || []);
  }, [macro]);

  const handleSave = () => {
    onUpdateMacro({ ...macro, title, content, description, type, language, tags: selectedTags });
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      // If checking a box, uncheck the other one
      setType([value]);
    } else {
      // If unchecking a box, set type to empty array
      setType([]);
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleTagChange = (e) => {
    const tagId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedTags([...selectedTags, tagId]);
    } else {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    }
  };

  return (
    <div className="w-full md:w-2/3 pl-4 text-neutral">
      <h2 className="text-xl font-semibold mb-3">Macros</h2>
      <div>
        <label className="block text-neutral text-sm font-bold mb-2">Title:</label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 bg-neutral border-gray-300 focus:ring-primary focus:border-primary text-dark"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-neutral text-sm font-bold mb-2">Content:</label>
        <textarea
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 bg-neutral border-gray-300 focus:ring-primary focus:border-primary text-dark"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
        />
      </div>
      <div>
        <label className="block text-neutral text-sm font-bold mb-2">Description:</label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 bg-neutral border-gray-300 focus:ring-primary focus:border-primary text-dark"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-neutral text-sm font-bold mb-2">Language:</label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 bg-neutral border-gray-300 focus:ring-primary focus:border-primary text-dark"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="English">English</option>
          <option value="Malay">Malay</option>
        </select>
      </div>

      <div>
        <label className="block text-neutral text-sm font-bold mb-2">Type:</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="email"
            value="Email"
            className="mr-2 leading-tight"
            checked={type.includes('Email')}
            onChange={handleTypeChange}
          />
          <label htmlFor="email" className="text-sm text-neutral">Email</label>

          <input
            type="checkbox"
            id="chat"
            value="Chat"
            className="ml-4 mr-2 leading-tight"
            checked={type.includes('Chat')}
            onChange={handleTypeChange}
          />
          <label htmlFor="chat" className="text-sm text-neutral">Chat</label>
        </div>
      </div>

      <div>
        <label className="block text-neutral text-sm font-bold mb-2">Tags:</label>
        <div className="flex flex-wrap">
          {tags.map(tag => (
            <div key={tag.id} className="mr-2 mb-2">
              <input
                type="checkbox"
                id={`tag-${tag.id}`}
                value={tag.id}
                className="mr-1 leading-tight"
                checked={selectedTags.includes(tag.id)}
                onChange={handleTagChange}
              />
              <label htmlFor={`tag-${tag.id}`} className="text-sm text-neutral">{tag.name}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="bg-primary hover:bg-teal-700 text-neutral font-bold py-2 px-4 rounded shadow-md transition duration-300 mr-2"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-neutral font-bold py-2 px-4 rounded shadow-md transition duration-300 mr-2"
          onClick={() => onDeleteMacro(macro.id)}
        >
          Delete
        </button>
        <button
          className="bg-dark hover:bg-gray-700 text-neutral font-bold py-2 px-4 rounded shadow-md transition duration-300"
          onClick={onCancel}
        >
          Back
        </button>
      </div>
    </div>
  );
};

MacroEditor.defaultProps = {
  tags: []
};

export default MacroEditor;
