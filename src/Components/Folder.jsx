import React, { useState } from 'react'
import './Folder.css';

const Folder = ({ handleInsertNode, handleUpdateNode, handleDeleteNode, explorer }) => {
    
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder:null
    })
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(explorer.name);
    
    if (!explorer || Object.keys(explorer).length === 0) {
        return null; // Display a message for empty state
    }
    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput({
            visible: true,
            isFolder,
        })
    }
    const handleAddFolder = (e) => {
        if(e.keyCode === 13 && e.target.value) {
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
            setShowInput({...showInput, visible: false});
        }
    }
    const handleDelete = (e) => {
        e.stopPropagation();
        handleDeleteNode(explorer.id);
    };
    const handleRenameClick = () => {
        setIsEditing(true);
    };
    const handleRenameChange = (e) => {
        setNewName(e.target.value);
    };
    const handleRenameSubmit = () => {
        if (newName.trim() !== '') {
            handleUpdateNode(explorer.id, newName.trim());
            setIsEditing(false);
        }
    };
    const handleRenameKeyDown = (e) => {
        if (e.keyCode === 13) { // Enter key
            handleRenameSubmit();
        }
        if (e.keyCode === 27) { // Escape key
            setIsEditing(false);
            setNewName(explorer.name); // Reset name to original
        }
    };
    if(explorer.isFolder) {
        return (
            <div style={{marginTop: 5}}>
                <div className='isFolder' onClick={() => setExpand(!expand)}>
                    {isEditing ? (
                        <input
                            className='renameInput'
                            value={newName}
                            onChange={handleRenameChange}
                            onKeyDown={handleRenameKeyDown}
                            onBlur={handleRenameSubmit}
                            autoFocus
                        />
                    ) : (
                        <span>📁 {explorer.name}</span>
                    )}
                    <div>
                        <button type='button' onClick={(e) => handleNewFolder(e, true)}>📁 ➕</button>
                        <button type='button' onClick={(e) => handleNewFolder(e, false)}>🗄 ➕</button>
                        <button onClick={handleRenameClick}>🖊</button>
                        <button onClick={handleDelete}>❌</button>
                    </div>
                </div>
                <div style={{display: expand ? 'block' : 'none', marginLeft: '25px'}}>
                    {
                        showInput.visible &&  (
                            <div className='inputContainer'>
                                <span>{showInput.isFolder ? '📁' : '🗄'}</span>
                                <input 
                                    className='inputContainer__input'
                                    autoFocus
                                    type='text'
                                    onKeyDown={handleAddFolder}
                                    onBlur={() => setShowInput({...showInput, visible: false})}
                                />
                            </div>
                        )
                    }
                    {
                        explorer.items.map(data => {
                            return (
                                <Folder
                                    handleInsertNode={handleInsertNode}
                                    handleDeleteNode={handleDeleteNode}
                                    handleUpdateNode={handleUpdateNode}
                                    explorer={data}
                                    key={data.id}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    } else {
        return <div className='isFile'>
                 {isEditing ? (
                    <input
                        className='renameInput'
                        value={newName}
                        onChange={handleRenameChange}
                        onKeyDown={handleRenameKeyDown}
                        onBlur={handleRenameSubmit}
                        autoFocus
                    />
                ) : (
                    <span className='file'>🗄 {explorer.name}</span>
                )}
                <div>
                    <button onClick={handleRenameClick}>🖊</button>
                    <button onClick={handleDelete}>❌</button>
                </div>
        </div>
    }
}

export default Folder