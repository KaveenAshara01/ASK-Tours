import { useState, useEffect, useCallback } from 'react';

const useFetch = url => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true)

        try {
            const res = await fetch(url)
            if (!res.ok) {
                setError('failed to fetch')

            }
            const result = await res.json()
            setData(result.data)
            setError(null);
        } catch (error) {

            setError(error.message)
            setData([]);

        } finally {
            setLoading(false)
        }
    }, [url]);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return {
        data,
        error,
        loading,
        reFetch: fetchData
    };
};

export default useFetch;