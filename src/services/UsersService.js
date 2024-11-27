import axios from '../config/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const userKeys = {
  all: ['users'],
  updateProfile: () => [...userKeys.all, 'update-profile']
};

class UserService {
  constructor(userData) {
    // Constructor that accepts individual parameters
    if (arguments.length > 1 || typeof userData !== 'object') {
      this.firstName = arguments[0];
      this.lastName = arguments[1];
      this.email = arguments[2];
      this.phone = arguments[3];
      this.positionPlayer = arguments[4];
      this.teamName = arguments[5];
      this.age = arguments[6];
      this.profilePictureUrl = arguments[7];
      this.id = arguments[8];
    } 
    // Constructor that accepts an object
    else {
      const formData = userData || {};

      this.firstName = formData.first_name;
      this.lastName = formData.last_name;
      this.email = formData.email;
      this.phone = formData.phone;
      this.positionPlayer = formData.position_player;
      this.teamName = formData.team_name;
      this.age = formData.age;
      this.profilePictureUrl = formData.profile_picture_url;
      this.id = formData.id;
    }
  }

  // Method to create multipart form data
  createMultipartFormData(profilePicture) {
    const formData = new FormData();

    // Append text fields
    if (this.firstName) formData.append('first_name', this.firstName);
    if (this.lastName) formData.append('last_name', this.lastName);
    if (this.email) formData.append('email', this.email);
    if (this.phone) formData.append('phone', this.phone);
    if (this.positionPlayer) formData.append('position_player', this.positionPlayer);
    if (this.teamName) formData.append('team_name', this.teamName);
    if (this.age) formData.append('age', this.age);
    if (this.id) formData.append('id', this.id);

    // Append profile picture if provided
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    return formData;
  }

  // Static method to update user profile
  static async updateProfile(userData, profilePicture) {
    const userService = new UserService(userData);
    const formData = userService.createMultipartFormData(profilePicture);

    try {
      const { data } = await axios.put('/users/update-user-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
}

// React Query hook for updating user profile
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userData, profilePicture }) => 
      UserService.updateProfile(userData, profilePicture),
    onSuccess: () => {
      queryClient.invalidateQueries(userKeys.updateProfile());
    },
  });
};

export default UserService;