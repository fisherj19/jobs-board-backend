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
  }
};

module.exports = companies;
