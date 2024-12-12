const useTraverseTree = () => {
    function insertNode(tree, folderId, item, isFolder) {
        if(tree.id === folderId && tree.isFolder) {
            tree.items.unshift({
                id: new Date().getTime(),
                name: item,
                isFolder,
                items: []
            })
            localStorage.setItem('explorer', JSON.stringify(tree));
            return tree;
        }
        // DFS Implement
        let latestNode = [];
        latestNode = tree.items.map(ob => {
            return insertNode(ob, folderId, item, isFolder);
        })
        const updatedTree = { ...tree, items: latestNode };
        localStorage.setItem('explorer', JSON.stringify(updatedTree));
        return updatedTree;
    }
    function deleteNode(tree, nodeId) {
        const filteredItems = tree.items.filter(item => item.id !== nodeId);
        let latestNode = [];
        latestNode = filteredItems.map(ob => {
            return deleteNode(ob, nodeId);
        })
        const updatedTree = { ...tree, items: latestNode };
        localStorage.setItem('explorer', JSON.stringify(updatedTree));
        return updatedTree;
    }
    function updateNode(tree, nodeId, newName) {
        if(tree.id === nodeId) {
            const updatedTree = { ...tree, name: newName }
            localStorage.setItem('explorer', JSON.stringify(updatedTree));
            return updatedTree;
        }
        let latestNode = [];
        latestNode = tree.items.map(ob => {
            return updateNode(ob, nodeId, newName);
        })
        const updatedTree = { ...tree, items: latestNode };
        localStorage.setItem('explorer', JSON.stringify(updatedTree));
        return updatedTree;
    }
    return { insertNode, deleteNode, updateNode };
}

export default useTraverseTree;