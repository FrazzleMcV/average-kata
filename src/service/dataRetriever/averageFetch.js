const fetchValue = async () => {
    const response = await fetch('https://csrng.net/csrng/csrng.php?min=0&max=100');

    const data = await response.json();
    const [result] = data;

    if (!result || result.status !== 'success') {
        throw new Error(`Could not fetch average: ${result?.reason}`);
    }

    return result.random;
}

module.exports = {fetchValue};