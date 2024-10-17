import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { User, Mail, Edit2 } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  motivation: string;
}

// Mock API call
const updateProfile = async (profile: UserProfile): Promise<UserProfile> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return profile;
};

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'devang m',
    email: 'devang@example.com',
    motivation: 'Become the best version of myself',
  });

  const mutation = useMutation(updateProfile, {
    onSuccess: (data) => {
      setProfile(data);
      alert('Profile updated successfully!');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(profile);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="motivation" className="block text-sm font-medium text-gray-700">Personal Motivation</label>
            <div className="mt-1">
              <textarea
                id="motivation"
                rows={3}
                value={profile.motivation}
                onChange={(e) => setProfile({ ...profile, motivation: e.target.value })}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={mutation.isLoading}
          >
            <Edit2 className="w-5 h-5 mr-2" />
            {mutation.isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;