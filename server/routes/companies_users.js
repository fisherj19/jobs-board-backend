const companies = {
  getAll: (req, res) => {
    const pool = req.app.get('pool');
    const qryStr = `
      select id,
        name,
        primary_first_name,
        primary_last_name,
        primary_phone,
        primary_email,
        address1,
        address2,
        city,
        state,
        zip_code,
        neighborhood_id,
        date_created,
        created_by,
        last_updated,
        updated_by,
        date_reviewed,
        reviewed_by
      from jobs.company
      order by id asc limit 10
    `;

    pool.select(res, qryStr);
  },

  getById: (req, res) => {
    const pool = req.app.get('pool');
    const qryStr = `
      select id,
        name,
        primary_first_name,
        primary_last_name,
        primary_phone,
        primary_email,
        address1,
        address2,
        city,
        state,
        zip_code,
        neighborhood_id,
        date_created,
        created_by,
        last_updated,
        updated_by,
        date_reviewed,
        reviewed_by
      from jobs.company
      where id = $1
    `;
    const params = new Array(req.params.id);

    pool.selectOne(res, qryStr, params, 'company');
  },
  insert: (req, res) => {
    const pool = req.app.get('pool');
    const qryStr = `
      insert into jobs.company (
        name,
        primary_first_name,
        primary_last_name,
        primary_phone,
        primary_email,
        address1,
        address2,
        city,
        state,
        zip_code,
        neighborhood_id,
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
        $9,
        $10,
        $11,
        $12,
        $13,
        $12,
        $13
      )
    `;
    const params = [ //On the request the body objects have all different properties
      req.body.name, //http form fields match the name of a field on the form
      req.body.primary_first_name,
      req.body.primary_last_name,
      req.body.primary_phone,
      req.body.primary_email,
      req.body.address1,
      req.body.address2,
      req.body.city,
      req.body.state,
      req.body.zip_code,
      req.body.neighborhood_id,
      new Date(),
      res.body.name
    ];
    pool.insert(res, qryStr, params);
  }
};

module.exports = companies;
