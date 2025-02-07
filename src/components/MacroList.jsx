import React from 'react';

const MacroList = ({ macros, onSelectMacro, selectedMacroId, tags }) => {
  return (
    <div className="w-full md:w-1/3 pr-4 text-textPrimary">
      <h2 className="text-xl font-semibold mb-3">Macro List</h2>
      <ul>
        {macros.map(macro => (
          <li
            key={macro.id}
            className={`py-3 px-4 rounded cursor-pointer transition duration-300 mb-2 shadow-sm ${selectedMacroId === macro.id ? 'bg-gray-800' : ''}`}
            onClick={() => onSelectMacro(macro)}
          >
            <div className="font-bold">{macro.title}</div>
            <div className="text-sm">{macro.description}</div>
            <div className="text-xs">
              {macro.tags && macro.tags.length > 0 && (
                <span>
                  Tags: {macro.tags.map(tagId => {
                  const tag = tags.find(tag => tag.id === tagId);
                  return tag ? tag.name : '';
                }).join(', ')}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MacroList;
