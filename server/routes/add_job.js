const add_job= {
    getAll: (req, res) => {
      const pool = req.app.get('pool');
      const qryStr = `
        companyName,
        jobName,
        jobDescription,
        name,
        phoneNumber,
        email,
        listDate,
        fillDate,
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
          insert into jobs.add_job (
            companyName,
            jobName,
            jobDescription,
            name,
            phoneNumber,
            email,
            listDate,
            fillDate
        ) values (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
        )
      `;
        const params = [
          cuid(),
          req.body.companyName,
          req.body.jobName,
          req.body.jobDescription,
          req.body.whoContact,
          req.body.name,
          req.body.phoneNumber,
          req.body.email,
          req.body.listDate,
          req.body.fillDate
        ];
        pool.insert(res, qryStr, params);
      }
    };
  
  module.exports = add_job;