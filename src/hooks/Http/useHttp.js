import { useState } from "react";

/** This function is to manage any sending request */
async function sendHttp (url, config) {

        const response = await fetch(url ,config);
        const resData = await response.json();
        if (!response.ok) {
            throw new Error(`Error in response request. Response: ${resData}`);
        }
        console.log("useHttp. Response OK --> ", resData);
        return resData;
};

export default function useHttp(initialData) {

    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState(initialData);
    const [error, setError] = useState();

    /** This function is to manage the states */
    async function sendRequest (url, config) {
        setIsFetching(true);
        try {
            const resData = await sendHttp(url, config);
            setData(resData);
        } catch (error) {
            setError(`Error in Catch ---> ${error}`);
        }
        setIsFetching(false);
    }
    
    return ({
        isFetching,
        data,
        error,
        sendRequest
    })
}

