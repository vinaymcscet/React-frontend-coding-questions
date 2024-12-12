import { useEffect, useState } from 'react';
import './App.css';
// import Carousel from './Components/Carousel';
// import StopWatch from './Components/StopWatch';
import data from './Data/Data';
import Folder from './Components/Folder';
import useTraverseTree from './useTraverseTree';

function App() {
  useEffect(() => {
    if (!localStorage.getItem('explorer')) {
      localStorage.setItem('explorer', JSON.stringify(data));
    }
  }, [])

  const storedData = localStorage.getItem('explorer');
  const [explorerData, setExplorerData] = useState(storedData ? JSON.parse(storedData) : data);
  const { insertNode, deleteNode, updateNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  }
  const handleDeleteNode = (id) => {
    const deleteRecursive = (node) => {
      if (!node) return null;
      if (node.id === id) {
          return null; // Remove the node
      }
      if (node.isFolder && node.items) {
          node.items = node.items
            .map(deleteRecursive)
            .filter((item) => item !== null);
      }
      return node;
    };

    if (explorerData.id === id) {
        // If the root is being deleted, reset the explorer data
        const emptyStructure = {};
        setExplorerData(emptyStructure);
        localStorage.setItem("explorer", JSON.stringify(emptyStructure)); // Optionally clear localStorage
    } else {
        const updatedExplorer = deleteRecursive({...explorerData});
        setExplorerData(updatedExplorer);
        localStorage.setItem('explorer', JSON.stringify(updatedExplorer));
    }
  }
  const handleUpdateNode = (nodeId, newName) => {
    const updateNodeRecursively = (tree, id, name) => {
      if(tree.id === id) {
        return { ...tree, name };
      }
      if(tree.isFolder) {
        const updatedItems = tree.items.map(item => updateNodeRecursively(item, id, name));
        return { ...tree, items: updatedItems}
      }
      return tree;
    }
    const finalTree = updateNodeRecursively(explorerData, nodeId, newName);
    setExplorerData(finalTree);
    localStorage.setItem('explorer', JSON.stringify(finalTree));
  }

  return (
    <div className="App">
      {/* <StopWatch /> 
      <Carousel /> */}
      <Folder
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleUpdateNode={handleUpdateNode}
        explorer={explorerData}
      />
    </div>
  );
}

export default App;
