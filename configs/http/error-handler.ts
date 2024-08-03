export default function errorHandler(error: any) {
  if (error.response.data.message) {
    console.log("Some error occured", error.response.data.message);
    return Promise.reject(error);
  }
}
