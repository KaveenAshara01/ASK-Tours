import { useState, useEffect } from 'react';

const useFetch = url => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await fetch(url, { credentials: 'include' });
            if (!res.ok) {
                setError('failed to fetch');
            }
            const result = await res.json();
            setData(result.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const res = await fetch(url, { credentials: 'include' })
                if (!res.ok) {
                    setError('failed to fetch')

                }
                const result = await res.json()
                setData(result.data)
                setLoading(false)
            } catch (error) {

                setError(error.message)
                setLoading(false)

            }
        };

        fetchData()

    }, [url]);

    return {
        data,
        error,
        loading,
        reFetch
    };
};

export default useFetch;
