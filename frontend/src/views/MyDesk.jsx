import React, { useState, useEffect } from 'react';
import { deskService } from '../services/deskService';
import { Folder, FileText, Plus, Trash2 } from 'lucide-react';

const MyDesk = () => {
    const [desk, setDesk] = useState(null);
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewFolder, setShowNewFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');

    useEffect(() => {
        fetchDesk();
    }, []);

    const fetchDesk = async () => {
        try {
            const data = await deskService.getDesk();
            setDesk(data.desk);
            setFolders(data.desk?.folders || []);
            setFiles(data.desk?.files || []);
        } catch (error) {
            console.error('Error fetching desk:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) return;

        const newFolder = {
            id: Date.now(),
            name: newFolderName,
            files: []
        };

        const updatedFolders = [...folders, newFolder];
        setFolders(updatedFolders);

        try {
            await deskService.updateDesk({ folders: updatedFolders, files });
            setNewFolderName('');
            setShowNewFolder(false);
        } catch (error) {
            console.error('Error creating folder:', error);
        }
    };

    const handleDeleteFolder = async (folderId) => {
        const updatedFolders = folders.filter(f => f.id !== folderId);
        setFolders(updatedFolders);

        try {
            await deskService.updateDesk({ folders: updatedFolders, files });
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    };

    if (loading) {
        return (
            <div className="container-custom py-8">
                <div className="glass-card animate-pulse h-96"></div>
            </div>
        );
    }

    return (
        <div className="container-custom py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold gradient-text mb-2">My Desk</h1>
                <p className="text-gray-600 dark:text-gray-400">Organize your personal study materials</p>
            </div>

            <div className="glass-card mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Folders</h2>
                    <button
                        onClick={() => setShowNewFolder(true)}
                        className="btn-secondary flex items-center space-x-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>New Folder</span>
                    </button>
                </div>

                {showNewFolder && (
                    <div className="mb-4 p-4 glass rounded-lg">
                        <input
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
                            className="input-field mb-3"
                            placeholder="Folder name..."
                            autoFocus
                        />
                        <div className="flex space-x-2">
                            <button onClick={handleCreateFolder} className="btn-primary py-2">
                                Create
                            </button>
                            <button
                                onClick={() => {
                                    setShowNewFolder(false);
                                    setNewFolderName('');
                                }}
                                className="btn-secondary py-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {folders.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {folders.map(folder => (
                            <div
                                key={folder.id}
                                className="glass rounded-lg p-4 hover:shadow-lg transition-shadow group"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <Folder className="w-12 h-12 text-primary-600" />
                                    <button
                                        onClick={() => handleDeleteFolder(folder.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-red-600"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="font-semibold truncate">{folder.name}</p>
                                <p className="text-sm text-gray-500">
                                    {folder.files?.length || 0} files
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No folders yet. Create one to get started!
                    </div>
                )}
            </div>

            <div className="glass-card">
                <h2 className="text-xl font-bold mb-4">Recent Files</h2>
                {files.length > 0 ? (
                    <div className="space-y-2">
                        {files.map((file, idx) => (
                            <div key={idx} className="flex items-center space-x-3 p-3 glass rounded-lg">
                                <FileText className="w-8 h-8 text-primary-600" />
                                <div>
                                    <p className="font-semibold">{file.name}</p>
                                    <p className="text-sm text-gray-500">{file.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No files uploaded yet
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyDesk;
