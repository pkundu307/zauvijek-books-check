const services = window.ZauvijekAPI.services;

export async function createPartyActivity(props: any) {
  try {
    const response = await services.partyActivity.createPartyActivity({
      ...props,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

// export async function getPartyActivities(props: any) {
//   try {
//     const { business_id } = props;
//     const response = await services.partyActivity.getPartyActivities({
//       business_id,
//     });
//     return response;
//   } catch (error: any) {
//     throw new Error(error.response.data.message);
//   }
// }

// export async function getPartyActivityById(id: string) {
//   try {
//     const response = await services.partyActivity
//     return response
//   } catch (error: any) {
//     throw new Error(error.response.data.message)
//   }
// }

export async function deletePartyActivity(id: string) {
  try {
    const response = await services.partyActivity.deletePartyActivity(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function updatePartyActivity(id: string, props: any) {
  try {
    const response = await services.partyActivity.updatePartyActivity(id, {
      ...props,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
