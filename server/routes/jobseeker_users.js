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
            street = $8,
            city = $9,
            state = $10,
            zip = $11,
            owns_car = $12,
            has_license = $13,
            ride_available = $14,
            status_id = $15,
            job_1 = $16,
            empl_1 = $17,
            job_2 = $18,
            empl_2 = $19,
            job_3 = $20,
            empl_3 = $21,
            job_interests = $22,
            last_updated = $23,
            skills = $24
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
        req.body.state,
        req.body.city,
        req.body.street,
        req.body.zip,
        Boolean(req.body.has_license),
        Boolean(req.body.owns_car),
        Boolean(req.body.ride_available),
        req.body.status_id,
        req.body.job_1,
        req.body.empl_1,
        req.body.job_2,
        req.body.empl_2,
        req.body.job_3,
        req.body.empl_3,
        req.body.job_interests,
        new Date(),
        req.body.skills
      ];
      pool.insert(res, qryStr, params);
  },
    getByID: (req, res) => {
      const pool = req.app.get('pool');
      const qryStr = `
          Select first_name,
          last_name,
          date_of_birth,
          sex,
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