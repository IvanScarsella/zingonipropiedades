import client from './client';

const DEFAULT_PARAMS = {};
const DEFAULT_TAGS = [];

export const sanityFetch = async ({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}) => {
  try {
    const response = await client.fetch(query, params);
    return response;
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    throw new Error(error.message);
  }
};
