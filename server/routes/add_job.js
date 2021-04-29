const add_job= {
    getAll: (req, res) => {
      const pool = req.app.get('pool');
      const qryStr = `
        select company_name,
        job_name,
        job_description,
        contact,
        phone_number,
        email,
        list_date,
        fill_date
        from jobs.client
      `;
      pool.select(res, qryStr);
    },
    getById: (req, res) => {
      const pool = req.app.get('pool');
      const qryStr = `
        select id,
        first_name,
        last_name,
        date_of_birth
        from jobs.client
        where id = $1
      `;
      const params = new Array(req.params.id);
  
      pool.selectOne(res, qryStr, params, 'add_job');
    },
      insert: (req, res) => {
        const pool = req.app.get('pool');
        const cuid = require('cuid');
        const qryStr = `
          insert into jobs.job (
            company_name,
            job_mame,
            job_description,
            contact,
            phone_number,
            email_address,
            list_date,
            fill_date
        ) values (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8
        )
      `;
        const params = [
          req.body.company_name,
          req.body.job_name,
          req.body.job_description,
          req.body.contact,
          req.body.phone_number,
          req.body.email_address,
          req.body.list_date,
          req.body.fill_date
        ];
        pool.insert(res, qryStr, params);
      }
    };
  
  module.exports = add_job;