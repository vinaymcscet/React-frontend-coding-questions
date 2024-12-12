const data = {
    id: 1,
    name: 'root',
    isFolder: true,
    items: [
        {
            id: 2,
            name: 'public',
            isFolder: true,
            items: [
                { id: 3, name: 'public nested 1', isFolder: true, items: [
                    { id: 4, name: 'index.html', isFolder: false, items: [] },
                    { id: 5, name: 'hello.html', isFolder: false, items: [] },
                ]},
                { id: 6, name: 'public_nested_file', isFolder: false, items: []}
            ]
        },
        {
            id: 7, name: 'src', isFolder: true, items: [
                { id: 8, name: 'App.jsx', isFolder: false, items: [] },
                { id: 9, name: 'Index.jsx', isFolder: false, items: [] },
                { id: 10, name: 'Style.css', isFolder: false, items: [] },
            ]
        },
        { id: 11, name: 'Package-lock.json', isFolder: false, items: [] },
        { id: 12, name: 'Package.json', isFolder: false, items: [] },
    ]
}

export default data;