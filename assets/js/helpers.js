export const getJSON = async function (url) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok)
            throw new Error(`${res.status} <br> ${data.status_message}`);
        return data;
    } catch (err) {
        throw err;
    }
};
