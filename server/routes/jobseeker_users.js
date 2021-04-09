const users= {
  insert: (req, res) => {
    const pool = req.app.get('pool');
    const qryStr = `
      insert into jobs.client (
        id,
        email_address,
        display_name,
        last_updated,
        date_created
      ) values (
        $1,
        $2,
        $3,
        $4,
        $5
      )
    `;
    const params = [
      req.body.id,
      req.body.email_address,
      req.body.displayName,
      new Date(),
      new Date()
    ];
    pool.insert(res, qryStr, params);
  },
    update: (req, res) => {
      const pool = req.app.get('pool');
      const qryStr = `
        update jobs.client 
          set first_name = $2,
            last_name = $3,
            date_of_birth = $4,
            sex = $5,
            phone_number = $6,
            email_address = $7,
            address = $8,
            owns_car = $9,
            has_license = $10,
            ride_available = $11,
            status_id = $12,
            experience = $13,
            job_interests = $14,
            last_updated = $15,
            skills = $16
          where id = $1
      `;
      const params = [
        req.body.id,
        req.body.firstName,
        req.body.lastName,
        req.body.dateOfBirth,
        req.body.gender,
        req.body.phone_number,
        req.body.email_address,
        req.body.address,
        Boolean(req.body.has_license),
        Boolean(req.body.owns_car),
        Boolean(req.body.ride_available),
        req.body.status_id,
        req.body.experience,
        req.body.job_interests,
        new Date(),
        req.body.skills
      ];
      pool.insert(res, qryStr, params);
    },
    getById: (req, res) => {
      const pool = req.app.get('pool');
      const qryStr = `
          first_name,
          last_name,
          date_of_birth,
          phone_number,
          email_address,
          address,
          owns_car,
          has_license,
          ride_available,
          status_id,
          experience,
          job_interests,
          skills
        from jobs.client
        where id = $1
      `;
      const params = new Array(req.params.id);

      pool.selectOne(res, qryStr, params, 'company');

    }
  };

module.exports = users;