const faker = require('faker');

const createFakeData = () => ({
  price: faker.random.number({
    'min': 70,
    'max': 150
  }),
  // stars: faker.random.number({
  //   'min': 1,
  //   'max': 5,
  // }),
  stars: faker.finance.amount(3,5,2),
  reviews: faker.random.number({
    'min': 10,
    'max': 300
  }),
  cleaningFee: faker.random.number({
    'min': 30,
    'max': 70
  }),
  serviceFee: faker.random.number({
    'min': 50,
    'max': 100
  }),
  guests: faker.random.number({
    'min': 1,
    'max': 12
  }),
  minNights: faker.random.number({
    'min': 1,
    'max': 3
  }),
  title: faker.name.firstName() + `'s ` + faker.company.catchPhraseAdjective() + ' Home',
  address: faker.address.streetAddress(),
  highlights: faker.lorem.paragraph(nb_sentences=faker.random.number({'min': 1, 'max': 4})),
  introDesc: faker.lorem.paragraph(nb_sentences=5, variable_nb_sentences=true),
  spaceDesc: faker.lorem.paragraphs(nb=faker.random.number({'min': 1, 'max': 6})),
  guestDesc: faker.lorem.paragraphs(nb=faker.random.number({'min': 1, 'max': 3})),
  otherDesc: faker.lorem.paragraphs(nb=faker.random.number({'min': 1, 'max': 3}))
});

const createFakeBookings = () => {
  // let fakeDate = faker.date.between('2019-01-01', '2019-04-01');
  let fakeCheckIn = [
    '01-01-2019', '01-08-2019', '01-15-2019', '01-22-2019',
    '01-01-2019', '01-08-2019', '01-15-2019', '01-22-2019',
    '01-01-2019', '01-08-2019', '01-15-2019', '01-22-2019',
    '01-29-2019', '02-05-2019', '02-12-2019', '02-19-2019',
    '01-29-2019', '02-05-2019', '02-12-2019', '02-19-2019',
    '01-29-2019', '02-05-2019', '02-12-2019', '02-19-2019',
    '02-26-2019', '03-05-2019', '03-12-2019', '03-19-2019',
    '02-26-2019', '03-05-2019', '03-12-2019', '03-19-2019',
    '03-26-2019', '04-02-2019', '04-09-2019', '04-16-2019',
  ]
  let fakeCheckOut = [
    '01-02-2019', '01-09-2019', '01-16-2019', '01-23-2019',
    '01-08-2019', '01-15-2019', '01-22-2019', '01-29-2019',
    '02-01-2019', '02-08-2019', '02-15-2019', '02-22-2019',
    '01-30-2019', '02-06-2019', '02-13-2019', '02-20-2019',
    '02-05-2019', '02-12-2019', '02-19-2019', '02-26-2019',
    '02-27-2019', '03-06-2019', '03-13-2019', '03-20-2019',
    '02-29-2019', '03-05-2019', '03-12-2019', '03-19-2019',
    '03-05-2019', '03-12-2019', '03-19-2019', '03-26-2019',
    '04-02-2019', '04-09-2019', '04-16-2019', '04-23-2019'
  ]
  let randomIndex = Math.floor(Math.random() * fakeCheckIn.length)
  return {
    checkin: fakeCheckIn[randomIndex],
    checkout: fakeCheckOut[randomIndex],
    numGuests: faker.random.number({
      'min': 1,
      'max': 12
    }),
    total: faker.random.number({
      'min': 50,
      'max': 10000
    }),
    listing_id: faker.random.number({
      'min': 1,
      'max': 1000000
    })
  }
}

exports.seed = async function(knex, Promise) {

  // const fakeBookings = [
  //   {
  //     checkin: '02-14-2019',
  //     checkout: '02-18-2019',
  //     numGuests: 2,
  //     total: 500,
  //     listing_id: 1
  //   },
  //   {
  //     checkin: '02-20-2019',
  //     checkout: '02-27-2019',
  //     numGuests: 3,
  //     total: 888,
  //     listing_id: 1
  //   },
  //   {
  //     checkin: '03-01-2019',
  //     checkout: '03-05-2019',
  //     numGuests: 2,
  //     total: 358,
  //     listing_id: 2
  //   }
  // ];
  
  const desiredFakeData = 10000000;
  const loopCount = desiredFakeData / 20;

  for (let i = 0; i < loopCount; i++) {
    let fakeData = [];
    for (let i = 0; i < 20; i++) {
      fakeData.push(createFakeData());
    }
    await knex('listings')
      .insert(fakeData);
  }
  for (let i = 0; i < loopCount; i++) {
    let fakeBookings = [];
    for (let i = 0; i < 20; i++) {
      fakeBookings.push(createFakeBookings());
    }
    await knex('bookings')
      .insert(fakeBookings);
  }

  // await knex('listings')
  //   .insert(fakeData);
  // await knex('bookings')
  //   .insert(fakeBookings);

};

