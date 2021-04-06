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
          support_contact = $6,
          phone_number = $7,
          owns_car = $8,
          has_license = $9,
          ride_available = $10,
          job_interests = $11,
          status_id = $12,
          date_created = $13,
          address = $14,
          skills = $15
          where id = $1
      `;
      const params = [
        req.body.id,
        req.body.firstName,
        req.body.lastName,
        req.body.dateOfBirth,
        req.body.gender,
        req.body.support_contact,
        req.body.phone_number,
        Boolean(req.body.owns_car),
        Boolean(req.body.has_license),
        Boolean(req.body.ride_available),
        req.body.job_interests,
        req.body.status_id,
        new Date(),
        req.body.address,
        req.body.skills
      ];
      pool.insert(res, qryStr, params);
    }
  };

module.exports = users;