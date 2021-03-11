const case_workers= {
    getAll: (req, res) => {
      const pool = req.app.get('pool');
      const qryStr = `
        select id,
        first_name,
        last_name,
        email
        from jobs.case_worker
      `;
  
      pool.select(res, qryStr);
    }
  
  };
  module.exports = case_workers;
  