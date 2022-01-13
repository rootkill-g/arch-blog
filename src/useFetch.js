import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, set_data] = useState(null);
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState(null);

  // useEffect is good for fetching data
  useEffect(() => {
    const abort_controlla = new AbortController();
    // Don't use setTimeout in real applications
    setTimeout(() => {
      fetch(url, { signal: abort_controlla.signal })
        .then(res => {
          if (!res.ok) {
            throw Error('Could not fetch the data for that resource');
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          set_data(data);
          set_loading(false);
          set_error(null);
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted');
          } else {
            set_loading(false);
            set_error(err.message);
          }
        });
    }, 1000);
    return () => abort_controlla.abort();
  }, []);

  return { data, loading, error }
}

export default useFetch;
