const grpcCall = (method: Function, request: any) =>
    new Promise((resolve, reject) => {
      method(request, (err: any, response: any) => {
        if (err) reject(err);
        else resolve(response);
      });
    });


export default grpcCall;