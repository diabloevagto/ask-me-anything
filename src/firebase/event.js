import { getDocAndRef } from './utils';

export const getAdminUUID = async () => {
  try {
    const { data } = await getDocAndRef('_admin', 'uuid');

    return data.uuid;
  } catch (error) {
    return error;
  }
};
