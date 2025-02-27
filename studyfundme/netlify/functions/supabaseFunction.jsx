const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  console.log('Function invoked');

  // Environment variables for Supabase
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

  console.log('SUPABASE_URL:', SUPABASE_URL);
  console.log('SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY);

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  if (event.httpMethod === 'GET') {
    // Example of querying data from Supabase
    const { data, error } = await supabase.from('studyfundme').select('*');

    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
};
