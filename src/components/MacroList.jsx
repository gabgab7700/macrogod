import React from 'react';

const MacroList = ({ macros, onSelectMacro, selectedMacroId, tags }) => {
  const getIcon = (macro) => {
    if (macro.type.includes('Email')) {
      return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 inline-block mr-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h15a2.25 2.25 0 012.25 2.25z" />
</svg>); // Email icon
    } else if (macro.type.includes('Chat')) {
      return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 inline-block mr-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75c.89 0 1.716-.084 2.502-.241m-2.502.241c.974 0 1.876-.149 2.726-.412C14.214 18.824 16.156 17.476 18 15.842m-1.318-1.571c1.633 .75 2.77 2.42 2.77 4.087m0 0V21L12 22.5 4.5 21v-2.25c0-1.666 1.137-3.337 2.77-4.087m0 0a2.422 2.422 0 00-2.77.412C5.786 14.824 3.844 16.176 2 17.842" />
</svg>); // Chat icon
    }
    return null;
  };

  return (
    <div className="w-full md:w-1/3 pr-4 text-neutral">
      <h2 className="text-xl font-semibold mb-3">Macro List</h2>
      <ul>
        {macros.map(macro => (
          <li
            key={macro.id}
            className={`py-3 px-4 rounded cursor-pointer hover:bg-gray-700 transition duration-300 mb-2 shadow-sm ${selectedMacroId === macro.id ? 'bg-gray-800' : ''}`}
            onClick={() => onSelectMacro(macro)}
          >
            <div className="font-bold">{getIcon(macro)}{macro.title}</div>
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
