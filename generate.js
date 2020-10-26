module.exports = function() {
  var Faker = require('Faker')
  var _ = require('lodash')
  return {
    cases: [
       {
        april: _.times(50, function (n) {
          return {
              createdDate: Faker.date.between("2020-04-01", "2020-04-30"),
              closedDate: Faker.date.between("2020-04-30", "2020-05-30"),
              caseName: Faker.company.companyName() + " vs " + Faker.company.companyName(),
              "assigned Lawyer": Faker.name.firstName() + " " + Faker.name.lastName() ,
          }
        })
       },
       {
        may: _.times(50, function (n) {
          return {
              createdDate: Faker.date.between("2020-05-01", "2020-05-30"),
              closedDate: Faker.date.between("2020-05-30", "2020-06-30"),
              caseName: Faker.company.companyName() + " vs " + Faker.company.companyName(),
              "assigned Lawyer": Faker.name.firstName() + " " + Faker.name.lastName() ,
          }
        })
       },
       {
        june: _.times(50, function (n) {
          return {
              createdDate: Faker.date.between("2020-06-01", "2020-06-30"),
              closedDate: Faker.date.between("2020-06-30", "2020-07-30"),
              caseName: Faker.company.companyName() + " vs " + Faker.company.companyName(),
              "assigned Lawyer": Faker.name.firstName() + " " + Faker.name.lastName() ,
          }
        })
       },
       {
        july: _.times(50, function (n) {
          return {
              createdDate: Faker.date.between("2020-07-01", "2020-07-30"),
              closedDate: Faker.date.between("2020-07-30", "2020-08-30"),
              caseName: Faker.company.companyName() + " vs " + Faker.company.companyName(),
              "assigned Lawyer": Faker.name.firstName() + " " + Faker.name.lastName() ,
          }
        })
       },
       {
        august: _.times(50, function (n) {
          return {
              createdDate: Faker.date.between("2020-08-01", "2020-08-30"),
              closedDate: Faker.date.between("2020-08-30", "2020-09-30"),
              caseName: Faker.company.companyName() + " vs " + Faker.company.companyName(),
              "assigned Lawyer": Faker.name.firstName() + " " + Faker.name.lastName() ,
          }
        })
       },
       {
        september: _.times(50, function (n) {
          return {
              createdDate: Faker.date.between("2020-09-01", "2020-09-30"),
              closedDate: Faker.date.between("2020-09-30", "2020-10-30"),
              caseName: Faker.company.companyName() + " vs " + Faker.company.companyName(),
              "assigned Lawyer": Faker.name.firstName() + " " + Faker.name.lastName() ,
          }
        })
       },
       {
        october: _.times(50, function (n) {
          return {
              createdDate: Faker.date.between("2020-10-01", "2020-10-30"),
              closedDate: Faker.date.between("2020-10-30", "2020--30"),
              caseName: Faker.company.companyName() + " vs " + Faker.company.companyName(),
              "assigned Lawyer": Faker.name.firstName() + " " + Faker.name.lastName() ,
          }
        })
       },
       
    ]
  }
}