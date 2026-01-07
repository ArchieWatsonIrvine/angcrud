import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apikey = "46F0B613-A331-42CE-B9EF-0096BB1F3547";
  const cloneReq = req.clone({
    setHeaders: {
      api_key: apikey,
    }
  });

  // Pass the cloned request to the next handler
  return next(cloneReq);
};