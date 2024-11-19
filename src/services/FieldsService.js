import axios from '../config/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export class Field {
  /**
   * Create a Field object from the given data.
   *
   * @param {Object} data - Data to create the Field object.
   * @param {number} data.id - Unique identifier of the field.
   * @param {string} data.name - Name of the field.
   * @param {string} data.address - Address of the field.
   * @param {string} [data.neighborhood] - Neighborhood of the field.
   * @param {string} [data.phone] - Phone number of the field.
   * @param {number} data.latitude - Latitude of the field.
   * @param {number} data.longitude - Longitude of the field.
   * @param {string} data.type - Type of the field (5, 7 or 11).
   * @param {number} data.price - Price of the field.
   * @param {string} [data.description] - Description of the field.
   * @param {string} [data.logo_url] - URL of the logo of the field.
   * @param {number} [data.average_rating] - Average rating of the field.
   * @param {Array<string>} [data.services] - Services that the field offers.
   * @param {Date|string} data.creation_date - Creation date of the field.
   * @param {Array<string>} [data.photos] - URLs of the photos of the field.
   * @param {string} [data.available_days] - Comma-separated list of available days of the field.
   * @param {Array<string>} [data.unvailable_dates] - Comma-separated list of unavailable dates of the field.
   * @param {Array<Object>} [data.reservations] - List of reservations of the field.
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.neighborhood = data.neighborhood;
    this.phone = data.phone;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.type = data.type;
    this.price = data.price;
    this.description = data.description;
    this.logoUrl = data.logo_url;
    this.averageRating = data.average_rating;
    this.services = data.services;
    this.creationDate = new Date(data.creation_date);
    this.photos = data.photos;
    this.availableDays = data.available_days;
    this.unavailableDates = data.unvailable_dates;
    this.reservations = data.reservations;
  }

  toJSON() {
    return {
      name: this.name,
      address: this.address,
      neighborhood: this.neighborhood,
      phone: this.phone,
      latitude: this.latitude,
      longitude: this.longitude,
      type: this.type,
      price: this.price,
      description: this.description,
      logo_url: this.logoUrl,
      services: this.services,
      creation_date: this.creationDate.toISOString().split('T')[0],
      photos: this.photos,
      available_days: this.availableDays,
    };
  }
}

export const fieldsKeys = {
  all: ['fields'],
  lists: () => [...fieldsKeys.all, 'list'],
  list: (filters) => [...fieldsKeys.lists(), { filters }],
  details: () => [...fieldsKeys.all, 'detail'],
  detail: (id) => [...fieldsKeys.details(), id],
};

export const FieldsService = {
  async getFields(params = {}) {
    const { data } = await axios.get('/fields', { params });
    console.log(data)
    return data.map(field => new Field(field));
  },

  async getField(id, params = {}) {
    const { data } = await axios.get(`/fields/${id}`, { params });
    return new Field(data);
  },

  async createField(fieldData) {
    const field = new Field(fieldData);
    const { data } = await axios.post('/fields', field.toJSON());
    return new Field(data);
  },

  async updateField(id, fieldData) {
    const field = new Field(fieldData);
    const { data } = await axios.put(`/fields/${id}`, field.toJSON());
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