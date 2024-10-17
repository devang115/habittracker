import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Plus, Calendar, Trash2 } from 'lucide-react';

interface Habit {
  id: number;
  name: string;
  goal: string;
  frequency: string;
  startDate: string;
  completed: boolean;
  streak: number;
}

// Mock API call
const addHabit = async (habit: Omit<Habit, 'id' | 'completed' | 'streak'>): Promise<Habit> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newHabit = { ...habit, id: Date.now(), completed: false, streak: 0 };
  const habits = JSON.parse(localStorage.getItem('habits') || '[]');
  habits.push(newHabit);
  localStorage.setItem('habits', JSON.stringify(habits));
  return newHabit;
};

const HabitManagement: React.FC = () => {
  const [newHabit, setNewHabit] = useState<Omit<Habit, 'id' | 'completed' | 'streak'>>({
    name: '',
    goal: '',
    frequency: 'daily',
    startDate: new Date().toISOString().split('T')[0],
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(addHabit, {
    onSuccess: () => {
      queryClient.invalidateQueries('habits');
      setNewHabit({ name: '', goal: '', frequency: 'daily', startDate: new Date().toISOString().split('T')[0] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(newHabit);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Habit Management</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Habit</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Habit Name</label>
            <input
              type="text"
              id="name"
              value={newHabit.name}
              onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Goal</label>
            <input
              type="text"
              id="goal"
              value={newHabit.goal}
              onChange={(e) => setNewHabit({ ...newHabit, goal: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">Frequency</label>
            <select
              id="frequency"
              value={newHabit.frequency}
              onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              id="startDate"
              value={newHabit.startDate}
              onChange={(e) => setNewHabit({ ...newHabit, startDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={mutation.isLoading}
          >
            <Plus className="w-5 h-5 mr-2" />
            {mutation.isLoading ? 'Adding...' : 'Add Habit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HabitManagement;