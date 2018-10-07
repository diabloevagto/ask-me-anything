const API_ROOT =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000/ask-me-anything-66fe2/us-central1'
    : 'https://us-central1-ask-me-anything-66fe2.cloudfunctions.net';

export const addQuestion = async ({ eventId }, context) => {
  const response = await fetch(`${API_ROOT}/questions/${eventId}/addQuestion`, {
    body: JSON.stringify({ context }),
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
  });

  return response;
};

export const addLike = async ({ eventId, uuid }, questionId) => {
  const response = await fetch(
    `${API_ROOT}/questions/${eventId}/${questionId}/like`,
    {
      body: JSON.stringify({ uuid }),
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  return response;
};

export const triggerStar = async ({ eventId }, questionId) => {
  const response = await fetch(
    `${API_ROOT}/questions/${eventId}/${questionId}/star`,
    {
      method: 'PATCH',
    },
  );

  return response;
};

export const triggerDone = async ({ eventId }, questionId) => {
  const response = await fetch(
    `${API_ROOT}/questions/${eventId}/${questionId}/done`,
    {
      method: 'PATCH',
    },
  );

  return response;
};
