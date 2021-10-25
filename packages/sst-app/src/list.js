import notes from './notes';

export async function main() {
  console.log('LINKEDIN_API_URL', process.env.LINKEDIN_API_URL);
  return {
    statusCode: 200,
    body: JSON.stringify(notes, null, '  '),
  };
}
