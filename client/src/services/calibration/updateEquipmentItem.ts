import { apiRoutes } from "../../constants/apiRoutes";
import makeApiCall from "../core/makeApiCall";

const updateEquipmentItem = async (payload) => {
  try {
    const data = await makeApiCall({
      url: apiRoutes.updateEquipment,
      method: "POST",
      payload,
    });
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default updateEquipmentItem;
