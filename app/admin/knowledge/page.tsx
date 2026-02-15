'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { kbEntries as initialEntries } from '../../data/mockData';
import type { KBEntry } from '../../types/types';
import Modal from '../../components/ui/Modal';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/ui/Icon';
import type { IconName } from '../../components/ui/Icon';
import { useApp } from '../../context/AppContext';

const sidebarItems = [
    { id: 'students', label: 'Students', icon: 'users' as IconName },
    { id: 'documents', label: 'Documents', icon: 'document' as IconName },
    { id: 'fees', label: 'Fees', icon: 'money' as IconName },
    { id: 'knowledge', label: 'Knowledge Base', icon: 'book' as IconName },
    { id: 'notifications', label: 'Notifications', icon: 'bell' as IconName },
];

const categories = ['Documents', 'Fees', 'LMS', 'General'];

const emptyForm = { title: '', category: 'Documents', content: '' };

export default function KnowledgeBasePage() {
    const router = useRouter();
    const { logout } = useApp();
    const [entries, setEntries] = useState<KBEntry[]>(initialEntries);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);

    const filtered = entries.filter(
        (e) =>
            e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openAddModal = () => {
        setEditingId(null);
        setForm(emptyForm);
        setModalOpen(true);
    };

    const openEditModal = (entry: KBEntry) => {
        setEditingId(entry.id);
        setForm({ title: entry.title, category: entry.category, content: entry.content });
        setModalOpen(true);
    };

    const handleSave = () => {
        if (!form.title.trim() || !form.content.trim()) return;

        if (editingId) {
            setEntries((prev) =>
                prev.map((e) =>
                    e.id === editingId
                        ? { ...e, title: form.title, category: form.category, content: form.content, lastUpdated: new Date().toISOString().split('T')[0] }
                        : e
                )
            );
        } else {
            const newEntry: KBEntry = {
                id: `kb-${Date.now()}`,
                title: form.title,
                category: form.category,
                content: form.content,
                lastUpdated: new Date().toISOString().split('T')[0],
            };
            setEntries((prev) => [newEntry, ...prev]);
        }
        setModalOpen(false);
        setForm(emptyForm);
        setEditingId(null);
    };

    const handleDelete = (id: string) => {
        setEntries((prev) => prev.filter((e) => e.id !== id));
    };

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-primary)' }}>
            <Sidebar items={sidebarItems} activeId="knowledge" onSelect={(id) => {
                if (id !== 'knowledge') router.push('/admin');
            }} onLogout={() => router.push('/login')} />

            <main className="flex-1 p-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-dark)' }}>
                            <Icon name="book" size={24} /> Knowledge Base
                        </h1>
                        <button
                            onClick={openAddModal}
                            className="px-5 py-2.5 rounded-md text-sm font-bold transition-all duration-200 cursor-pointer"
                            style={{
                                backgroundColor: 'var(--color-accent)',
                                color: 'white',
                                border: '2px solid var(--color-dark)',
                            }}
                        >
                            + Add New
                        </button>
                    </div>

                    {/* Search */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search by title or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full max-w-md px-4 py-3 rounded-md text-sm outline-none"
                            style={{
                                backgroundColor: 'var(--color-secondary)',
                                border: '2px solid var(--color-dark)',
                                color: 'var(--color-dark)',
                            }}
                        />
                    </div>

                    {/* Table */}
                    <div
                        className="rounded-lg border-2 shadow-md overflow-hidden"
                        style={{ backgroundColor: 'var(--color-secondary)', borderColor: 'var(--color-dark)' }}
                    >
                        <div
                            className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold uppercase tracking-wider border-b-2"
                            style={{ color: 'var(--color-accent)', borderColor: 'var(--color-dark)' }}
                        >
                            <div className="col-span-5">Title</div>
                            <div className="col-span-2">Category</div>
                            <div className="col-span-2">Last Updated</div>
                            <div className="col-span-3 text-right">Actions</div>
                        </div>

                        {filtered.map((entry) => (
                            <div
                                key={entry.id}
                                className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b transition-colors"
                                style={{ borderColor: 'rgba(0,0,0,0.06)' }}
                            >
                                <div className="col-span-5">
                                    <p className="text-sm font-medium" style={{ color: 'var(--color-dark)' }}>
                                        {entry.title}
                                    </p>
                                </div>
                                <div className="col-span-2">
                                    <span
                                        className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold"
                                        style={{
                                            backgroundColor: 'var(--color-primary)',
                                            color: 'var(--color-accent)',
                                            border: '1px solid var(--color-accent)',
                                        }}
                                    >
                                        {entry.category}
                                    </span>
                                </div>
                                <div className="col-span-2 text-xs font-mono" style={{ color: 'var(--status-locked)' }}>
                                    {entry.lastUpdated}
                                </div>
                                <div className="col-span-3 flex justify-end gap-2">
                                    <button
                                        onClick={() => openEditModal(entry)}
                                        className="px-3 py-1 rounded text-xs font-bold cursor-pointer transition-all"
                                        style={{
                                            backgroundColor: 'var(--color-primary)',
                                            color: 'var(--color-accent)',
                                            border: '1.5px solid var(--color-accent)',
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(entry.id)}
                                        className="px-3 py-1 rounded text-xs font-bold cursor-pointer transition-all"
                                        style={{
                                            backgroundColor: 'rgba(239,68,68,0.1)',
                                            color: '#ef4444',
                                            border: '1.5px solid #ef4444',
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}

                        {filtered.length === 0 && (
                            <div className="px-6 py-12 text-center text-sm" style={{ color: 'var(--status-locked)' }}>
                                No entries found.
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Add / Edit Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setEditingId(null); setForm(emptyForm); }}
                title={editingId ? 'Edit Entry' : 'Add New Entry'}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>
                            Title
                        </label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-md text-sm outline-none"
                            style={{
                                backgroundColor: 'var(--color-secondary)',
                                border: '2px solid var(--color-dark)',
                                color: 'var(--color-dark)',
                            }}
                            placeholder="Enter title"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>
                            Category
                        </label>
                        <select
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-md text-sm outline-none cursor-pointer"
                            style={{
                                backgroundColor: 'var(--color-secondary)',
                                border: '2px solid var(--color-dark)',
                                color: 'var(--color-dark)',
                            }}
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>
                            Content
                        </label>
                        <textarea
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            rows={5}
                            className="w-full px-4 py-2.5 rounded-md text-sm outline-none resize-none"
                            style={{
                                backgroundColor: 'var(--color-secondary)',
                                border: '2px solid var(--color-dark)',
                                color: 'var(--color-dark)',
                            }}
                            placeholder="Enter content..."
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            onClick={() => { setModalOpen(false); setEditingId(null); setForm(emptyForm); }}
                            className="px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
                            style={{
                                backgroundColor: 'var(--color-secondary)',
                                border: '2px solid var(--color-dark)',
                                color: 'var(--color-dark)',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-5 py-2 rounded-md text-sm font-bold cursor-pointer"
                            style={{
                                backgroundColor: 'var(--color-accent)',
                                color: 'white',
                                border: '2px solid var(--color-dark)',
                            }}
                        >
                            {editingId ? 'Update' : 'Save'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
