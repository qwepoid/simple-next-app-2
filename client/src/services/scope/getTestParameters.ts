import { apiRoutes } from "../../constants/apiRoutes";

const getTestParameters = async (material) => {
    const data = await fetch(`${apiRoutes.getTestParameters}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({material})
    }).then((res) => res.json());
    return data.map(item => item.testParameter);
}

export default getTestParameters;