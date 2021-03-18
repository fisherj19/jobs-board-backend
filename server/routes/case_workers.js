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
    },
    insert: (req, res) => {
    const cuid = require('cuid');
    const pool = req.app.get('pool');
    const qryStr = `
      insert into jobs.case_worker (
        id,
        first_name,
        last_name,
        phone,
        email,
        is_active,
        date_created,
        created_by,
        last_updated,
        updated_by
      ) values (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $7,
        $8
      )
    `;
    const params = [
      cuid(),
      req.body.first_name,
      req.body.last_name,
      req.body.phone,
      req.body.email,
      true,
      new Date(),
      req.locals._current_user_id || 'system'
    ];

    pool.insert(res, qryStr, params);
  
  }
};

  module.exports = case_workers;
  