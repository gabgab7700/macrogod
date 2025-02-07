import React, { useState } from 'react';

const TagsPage = ({ tags, setTags, onAddTag, onUpdateTag, onDeleteTag }) => {
  const [newTagName, setNewTagName] = useState('');
  const [editingTagId, setEditingTagId] = useState(null);
  const [editingTagName, setEditingTagName] = useState('');

  const handleAddTag = () => {
    if (newTagName.trim() !== '') {
      const newTag = {
        id: Date.now(),
        name: newTagName.trim(),
      };
      onAddTag(newTag);
      setNewTagName('');
    }
  };

  const handleUpdateTag = () => {
    if (editingTagName.trim() !== '') {
      const updatedTag = {
        id: editingTagId,
        name: editingTagName.trim(),
      };
      onUpdateTag(updatedTag);
      setEditingTagId(null);
      setEditingTagName('');
    }
  };

  const handleDeleteTag = (id) => {
    onDeleteTag(id);
  };

  return (
    <div className="p-4 text-textPrimary">
      <h3 className="text-lg font-semibold mb-2">Manage Tags</h3>

      <div className="mb-4">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 bg-neutral border-gray-300 focus:ring-primary focus:border-primary text-dark"
          placeholder="New tag name"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
        />
        <button
          className="bg-primary text-neutral font-bold py-2 px-4 rounded shadow-md transition duration-300"
          onClick={handleAddTag}
        >
          Add Tag
        </button>
      </div>

      <ul>
        {tags.map((tag) => (
          <li key={tag.id} className="py-2 px-4 rounded flex items-center justify-between mb-2 shadow-sm bg-gray-700">
            {editingTagId === tag.id ? (
              <>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-neutral border-gray-300 focus:ring-primary focus:border-primary text-dark"
                  value={editingTagName}
                  onChange={(e) => setEditingTagName(e.target.value)}
                />
                <button
                  className="bg-blue-500 text-neutral font-bold py-2 px-4 rounded shadow-md transition duration-300 ml-2"
                  onClick={handleUpdateTag}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-neutral font-bold py-2 px-4 rounded shadow-md transition duration-300 ml-2"
                  onClick={() => setEditingTagId(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{tag.name}</span>
                <div>
                  <button
                    className="bg-blue-500 text-neutral font-bold py-2 px-4 rounded shadow-md transition duration-300 mr-2"
                    onClick={() => {
                      setEditingTagId(tag.id);
                      setEditingTagName(tag.name);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-neutral font-bold py-2 px-4 rounded shadow-md transition duration-300"
                    onClick={() => handleDeleteTag(tag.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsPage;
