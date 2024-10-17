import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CheckCircle, XCircle, Zap, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface Habit {
  id: number;
  name: string;
  completed: boolean;
  streak: number;
}

// Mock API calls
const fetchHabits = async (): Promise<Habit[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const habits = localStorage.getItem('habits');
  return habits ? JSON.parse(habits) : [];
};

const toggleHabitCompletion = async (habit: Habit): Promise<Habit> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const updatedHabit = { 
    ...habit, 
    completed: !habit.completed,
    streak: habit.completed ? habit.streak : habit.streak + 1
  };
  const habits = await fetchHabits();
  const updatedHabits = habits.map(h => h.id === habit.id ? updatedHabit : h);
  localStorage.setItem('habits', JSON.stringify(updatedHabits));
  return updatedHabit;
};

const Dashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: habits, isLoading, error } = useQuery('habits', fetchHabits);

  const toggleMutation = useMutation(toggleHabitCompletion, {
    onSuccess: (updatedHabit) => {
      queryClient.invalidateQueries('habits');
      if (updatedHabit.completed) {
        toast.success(`Congratulations! You've completed "${updatedHabit.name}"!`, {
          icon: '🎉',
          duration: 3000,
        });
      }
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Today's Habits</h2>
        <p className="text-gray-600 mb-4">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
        <ul className="space-y-4">
          {habits?.map(habit => (
            <li key={habit.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
              <div className="flex items-center">
                <button
                  onClick={() => toggleMutation.mutate(habit)}
                  className={`w-6 h-6 mr-3 ${habit.completed ? 'text-green-500' : 'text-gray-300'}`}
                >
                  {habit.completed ? <CheckCircle /> : <XCircle />}
                </button>
                <span className={habit.completed ? 'line-through text-gray-500' : ''}>{habit.name}</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">{habit.streak} day streak</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Motivational Message</h2>
        <p className="text-gray-600 italic">"The secret of getting ahead is getting started." - Mark Twain</p>
      </div>
    </div>
  );
};

export default Dashboard;