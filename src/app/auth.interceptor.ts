import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apikey = "[APIKEY]";
  const cloneReq = req.clone({
    setHeaders: {
      api_key: apikey,
    }
  });

  // Pass the cloned request to the next handler
  return next(cloneReq);
};
