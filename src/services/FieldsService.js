import axios from '../config/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import UserService from './UsersService';

export class Field {
  /**
   * Create a Field object from the given data.
   *
   * @param {Object} data - Data to create the Field object.
   * @param {number} [data.id] - Unique identifier of the field.
   * @param {string} data.name - Name of the field.
   * @param {number} [data.user_id] - User ID associated with the field.
   * @param {string} [data.address] - Address of the field.
   * @param {string} [data.neighborhood] - Neighborhood of the field.
   * @param {string} [data.phone] - Phone number of the field.
   * @param {number} [data.latitude] - Latitude of the field.
   * @param {number} [data.longitude] - Longitude of the field.
   * @param {string} [data.type] - Type of the field (5, 7 or 11).
   * @param {number} [data.price] - Price of the field.
   * @param {string} [data.description] - Description of the field.
   * @param {Array<{id: number}>} [data.services] - Services that the field offers.
   * @param {string|Date} [data.creation_date] - Creation date of the field.
   * @param {string[]} [data.available_days] - Available days of the field.
   * @param {Array<{fromDate: string, toDate: string}>} [data.unvailable_dates] - Unavailable dates of the field.
   * @param {File[]} [data.fieldImages] - Images of the field.
   */
  constructor(data = {}) {
    this.id = data.id;
    this.name = data.name;
    this.userId = data.user_id || 1;
    this.address = data.address;
    this.neighborhood = data.neighborhood;
    this.phone = data.phone;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.type = data.type;
    this.price = data.price;
    this.description = data.description;
    this.averageRating = data.average_rating || 3.5;
    this.services = data.services || [];
    this.creationDate = data.creation_date ? 
      (data.creation_date instanceof Date ? 
        data.creation_date : 
        new Date(data.creation_date)) : 
      new Date();
    this.availableDays = data.available_days || [];
    this.unavailableDates = data.unvailable_dates || [];
    this.fieldImages = data.fieldImages || [];
    this.photos = data.photos || [];
    this.reservations = data.reservations || [];
  }

  /**
   * Convert the field data to MultipartFormData
   * @returns {FormData}
   */
  toMultipartFormData() {
    const formData = new FormData();

    // Basic fields
    formData.append('name', this.name);
    if (this.userId) formData.append('user_id', this.userId);
    if (this.address) formData.append('address', this.address);
    if (this.neighborhood) formData.append('neighborhood', this.neighborhood);
    if (this.phone) formData.append('phone', this.phone);
    if (this.latitude) formData.append('latitude', this.latitude);
    if (this.longitude) formData.append('longitude', this.longitude);
    if (this.type) formData.append('type', this.type);
    if (this.price) formData.append('price', this.price);
    if (this.description) formData.append('description', this.description);

    // Services
    this.services.forEach((service, index) => {
      formData.append(`services[${index}].id`, service.id);
    });

    // Available days
    this.availableDays.forEach(day => {
      formData.append('available_days', day);
    });

    // Creation date
    if (this.creationDate) {
      formData.append('creation_date', this.creationDate.toISOString().split('T')[0]);
    }

    // Unavailable dates
    this.unavailableDates.forEach((unavailableDate, index) => {
      formData.append(`unvailable_dates[${index}].fromDate`, unavailableDate.fromDate);
      formData.append(`unvailable_dates[${index}].toDate`, unavailableDate.toDate);
    });

    // Field images
    this.fieldImages.forEach(image => {
      formData.append('fieldImages', image);
    });

    return formData;
  }

  /**
   * Save the field 
   * @param {Object} options - Save options
   * @param {Function} [options.onSuccess] - Success callback
   * @param {Function} [options.onError] - Error callback
   * @returns {Promise}
   */
  async save(options = {}) {
    try {
      // If the field has an ID, update. Otherwise, create.
      const response = this.id 
        ? await FieldsService.updateField(this.id, this.toMultipartFormData())
        : await FieldsService.createField(this.toMultipartFormData());

      await UserService.refreshToken();
      
      if (options.onSuccess) {
        options.onSuccess(response);
      }
      return response;
    } catch (error) {
      if (options.onError) {
        options.onError(error);
      }
      throw error;
    }
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      user_id: this.userId,
      address: this.address,
      neighborhood: this.neighborhood,
      phone: this.phone,
      latitude: this.latitude,
      longitude: this.longitude,
      type: this.type,
      price: this.price,
      description: this.description,
      services: this.services,
      creation_date: this.creationDate.toISOString().split('T')[0],
      available_days: this.availableDays,
      unvailable_dates: this.unavailableDates
    };
  }
}

export const FieldsService = {
  async getFields(params = {}) {
    const { data } = await axios.get('/fields', { params });
    return data.map(field => new Field(field));
  },

  async getField(id, params = {}) {
    const { data } = await axios.get(`/fields/${id}`, { params });
    return new Field(data);
  },

  async createField(fieldData) {
    const { data } = await axios.post('/fields', fieldData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });
    return new Field(data);
  },

  async updateField(id, fieldData) {
    const { data } = await axios.put(`/fields/${id}`, fieldData);
    return new Field(data);
  },

  async patchField(id, partialData) {
    const { data } = await axios.patch(`/fields/${id}`, partialData);
    return new Field(data);
  }
};

// ****************
// React Query Hooks
// ****************
export const fieldsKeys = {
  all: ['fields'],
  lists: () => [...fieldsKeys.all, 'list'],
  list: (filters) => [...fieldsKeys.lists(), { filters }],
  details: () => [...fieldsKeys.all, 'detail'],
  detail: (id) => [...fieldsKeys.details(), id],
};

export const useFields = (params = {}) => {
  return useQuery({
    queryKey: fieldsKeys.list(params),
    queryFn: () => FieldsService.getFields(params)
  });
};

export const useField = (id, params = {}) => {
  console.log(id);
  return useQuery({
    queryKey: fieldsKeys.detail(id),
    queryFn: () =>{console.log('Fetching field with id:', id); FieldsService.getField(id, params)},
    enabled: !!id
  });
};

export const useCreateField = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (fieldData) => FieldsService.createField(fieldData),
    onSuccess: () => {
      queryClient.invalidateQueries(fieldsKeys.lists());
    },
  });
};

export const useUpdateField = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => FieldsService.updateField(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(fieldsKeys.detail(variables.id));
      queryClient.invalidateQueries(fieldsKeys.lists());
    },
  });
};

export const usePatchField = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => FieldsService.patchField(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(fieldsKeys.detail(variables.id));
      queryClient.invalidateQueries(fieldsKeys.lists());
    },
  });
};