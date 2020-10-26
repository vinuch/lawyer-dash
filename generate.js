module.exports = function() {
  var Faker = require('Faker')
  var _ = require('lodash')
  return {
    cases: _.times(50, function (n) {
      return {
          createdDate: Faker.date.between("2020-04-01", "2020-10-26"),
          closedDate: null,
          caseName: Faker.company.companyName() + " vs " + Faker.company.companyName(),
          "assigned Lawyer": Faker.name.firstName() + " " + Faker.name.lastName() ,
          isActive: "true",
          isClosed: "false"
      }
    })
  }
}