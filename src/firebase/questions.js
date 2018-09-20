import { getDocAndRef, addDoc } from './utils';

export const addQuestion = async (eventId, payload) => {
  return await addDoc(eventId, payload);
};

export const addLike = async (eventId, payload) => {
  try {
    const { ref, data } = await getDocAndRef(eventId, payload);

    await ref.update({
      like: data.like + 1,
    });

    return true;
  } catch (error) {
    return error;
  }
};

export const triggerStar = async (eventId, payload) => {
  try {
    const { ref, data } = await getDocAndRef(eventId, payload);

    await ref.update({
      star: !data.star,
    });

    return true;
  } catch (error) {
    return error;
  }
};

export const triggerDone = async (eventId, payload) => {
  try {
    const { ref, data } = await getDocAndRef(eventId, payload);

    await ref.update({
      done: !data.done,
    });

    return true;
  } catch (error) {
    return error;
  }
};
