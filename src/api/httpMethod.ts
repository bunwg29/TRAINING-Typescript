// This file contains methods for handle http method like: GET, PUT, PATCH, POST, DELETE
import { instanceAxios } from './setup';

/**
 * [GET] DATA METHOD
 * @param endPoint - this is end point of url for particular purpose and is created from functions from endPoint.ts file
 * @param limit - this is limited item of each data return from api for user and default limit is 10 items
 * @returns - provide data for handle logic
 */

export const getDataFromApi = async (endPoint: string, limit: number = 10) => {
  try {
    const res = await instanceAxios.get(endPoint, {
      params: {
        limit,
      },
    });
    return res.data;
  } catch (error) {
    console.log('getDataFromApi error: ' + error);
  }
};

/**
 * [POST] DATA METHOD
 * @param endPoint - this is end point of url for particular purpose and is created from functions from endPoint.ts file
 * @param updateData - this is data get from form and transfer to this function to handle [POST] method
 */

export const postDataFromApi = async (
  endPoint: string,
  updateData: Record<string, string>
) => {
  try {
    await instanceAxios.post(endPoint, updateData);
  } catch (error) {
    console.log('postDataFromApi error: ' + error);
  }
};

/**
 * [PUT] DATA METHOD
 * @param endPoint - this is end point of url for particular purpose and is created from functions from endPoint.ts file
 * @param updateData - this is data get from form and transfer to this function to handle [PUT] method
 */

export const putDataFromApi = async (
  endPoint: string,
  updateData: Record<string, string>
) => {
  try {
    await instanceAxios.put(endPoint, updateData);
  } catch (error) {
    console.log('putDataFromApi error: ' + error);
  }
};

/**
 * [PATCH] DATA METHOD
 * @param endPoint - this is end point of url for particular purpose and is created from functions from endPoint.ts file
 * @param updateData - this is data get from form and transfer to this function to handle [PATCH] method
 */

export const patchDataFromApi = async (
  endPoint: string,
  updateData: Record<string, string>
) => {
  try {
    await instanceAxios.patch(endPoint, updateData);
  } catch (error) {
    console.log('patchDataFromApi error: ' + error);
  }
};

/**
 * [DELETE] DATA METHOD
 * @param endPoint - this is end point of url for particular purpose and is created from functions from endPoint.ts file
 */

export const deleteDataFromApi = async (endPoint: string) => {
  try {
    await instanceAxios.delete(endPoint);
  } catch (error) {
    console.log('deleteDataFromApi error: ' + error);
  }
};
