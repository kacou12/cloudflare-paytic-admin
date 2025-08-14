const mokAdmins = require('./admin.json')

function setupAdminRoutes(server) {
  // get all admins
  server.get('/admins', async (req, res) => {
    const page = req.query.page
    const searchText = req.query.searchText

    if (searchText) {
      console.log('====================================')
      console.log(
        'search : ',
        mokAdmins.filter(
          (admin) =>
            admin.firstName.toLowerCase().includes(searchText) ||
            admin.lastName.toLowerCase().includes(searchText),
        ),
      )
      console.log('====================================')
      return res.json({
        data: {
          data: mokAdmins.filter(
            (admin) =>
              admin.firstName.toLowerCase().includes(searchText) ||
              admin.lastName.toLowerCase().includes(searchText),
          ),
          hasNext: false,
          total: 20,
        },
        code: 200,
        msg: 'OK',
      })
    }

    return res.json({
      data: {
        data: mokAdmins.slice(10 * (page - 1), 10 * page),
        hasNext: false,
        total: 20,
      },
      code: 200,
      msg: 'OK',
    })
  })
  // get details  admin
  server.get('/admin/:id', async (req, res) => {
    const id = req.params.id
    let findedAdmin = mokAdmins.filter((admin) => {
      if (admin.id == id) {
        return res.json({
          data: admin,
          code: 200,
          msg: 'OK',
        })
      }
    })[0]
    console.log('findedAdmin: ', findedAdmin)

    return findedAdmin
  })

  // update  admin
  server.put('/admin/:id', async (req, res) => {
    const page = req.query.page
    console.log('body: ', req.body)
    console.log('test: ', req.test)
    console.log('query: ', req.query)
    console.log('params: ', req.params)

    // const searchText = req.query.searchText

    // let productSlug = req.body.productSlug

    return res.json({
      data: mokAdmins[0],
      code: 200,
      msg: 'OK',
    })
  })
}
module.exports = setupAdminRoutes
