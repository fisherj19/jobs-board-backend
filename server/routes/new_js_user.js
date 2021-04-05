const users= {
  insert: (req, res) => {
    const pool = req.app.get('pool');
    const qryStr = `
      insert into jobs.client (
        id,
        email_address,
        display_name,
        last_updated,
        date_created,
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
  }
  };

module.exports = users;