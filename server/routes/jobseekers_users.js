
const users= {
  getAll: (req, res) => {
    const pool = req.app.get('pool');
    const qryStr = `
      select id,
      first_name,
      last_name,
      date_of_birth
      from jobs.client
    `;
    pool.select(res, qryStr);
  },
  getById: (req, res) => {
    const pool = req.app.get('pool');
    const qryStr = `
      select
      first_name,
      last_name,
      date_of_birth,
      sex,
      support_contact,
      phone_number,
      email_address,
      owns_car,
      has_license,
      ride_available,
      job_interests,
      status_id,
      address
      from jobs.client
      where id = $1
    `;
    const params = new Array(req.params.id);

    pool.selectOne(res, qryStr, params, 'client');
  },
  insert: (req, res) => {
    const pool = req.app.get('pool');
    const qryStr = `
      insert into jobs.client (
        id,
        first_name,
        last_name,
        date_of_birth,
        sex,
        support_contact,
        phone_number,
        email_address,
        owns_car,
        has_license,
        ride_available,
        job_interests,
        status_id,
        date_created,
        skills
      ) values (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14,
        $15
      )
    `;
    const params = [
      req.body.id,
      req.body.firstName,
      req.body.lastName,
      req.body.dateOfBirth,
      req.body.gender,
      req.body.support_contact,
      req.body.phone_number,
      req.body.email_address,
      Boolean(req.body.owns_car),
      Boolean(req.body.has_license),
      Boolean(req.body.ride_available),
      req.body.job_interests,
      req.body.status_id || 5,
      new Date(),
      req.body.skills
    ];
    pool.insert(res, qryStr, params);
  }
  };

module.exports = users;