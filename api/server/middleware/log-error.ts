module.exports = () => {
  return (err: any, req: any, res: any, next: Function) => {
    //console.error('ERR', req.url, err);
    next(err);
  };
};
