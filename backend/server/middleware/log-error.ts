module.exports = () => {
  return (err: any, req: any, res: any, next: Function) => {
    // console.error('ERR', req.url, err);
    if (err.statusCode === 401 || err.statusCode === 502 && req.body) console.error('ERR', req.url, req.body);
    else console.error('ERR', req.url, err);
    next(err);
  };
};
