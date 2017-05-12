'use strict';

const db = require('APP/db')
    , {User, Band, Member, Promise} = db
    , {mapValues} = require('lodash');

function seedEverything() {
  const seeded = {
    users: users(),
    bands: bands(),
    members: members()
  };

  // seeded.favorites = favorites(seeded)

  return Promise.props(seeded);
}

const users = seed(User, {
  admin: {
    name: 'Admin',
    email: 'admin@example.com',
    password: '1234',
    admin: true
  },
  bob: {
    email: 'bob@example.com',
    name: 'User',
    password: '1234',
  },
  kavis: {
    name: 'Kavis',
    email: 'kavispires@gmail.com',
    password: '1234'
  }
});

const bands = seed(Band, {
  girlsgeneration: {name: 'Girls\' Generation'},
  wondergirls: {name: 'Wonder Girls'},
  twice: {name: 'Twice'},
  superjunior: {name: 'Super Junior'},
  blackpink: {name: 'Black Pink'},
  girlsaloud: {name: 'Girls Aloud'}
});

const members = seed(Member, {
  taeyeon: {name: 'Taeyeon', color: 'orange', band_id: 1},
  sunny: {name: 'Sunny', color: 'purple', band_id: 1},
  tiffany: {name: 'Tiffany', color: 'pink', band_id: 1},
  hyeyeon: {name: 'Hyoyeon', color: 'green', band_id: 1},
  yuri: {name: 'Yuri', color: 'red', band_id: 1},
  sooyoung: {name: 'Sooyoung', color: 'cyan', band_id: 1},
  yoona: {name: 'Yoona', color: 'yellow', band_id: 1},
  seohyun: {name: 'Seohyun', color: 'teal', band_id: 1},
  yubin: {name: 'Yubin', color: 'green', band_id: 2},
  yenny: {name: 'Yenny', color: 'cyan', band_id: 2},
  sunmi: {name: 'Sunmi', color: 'red', band_id: 2},
  hyerim: {name: 'Hyerum', color: 'pink', band_id: 2},
  nayeon: {name: 'Nayeon', color: 'orange', band_id: 3},
  jeongyeon: {name: 'Jeongyeon', color: 'green', band_id: 3},
  momo: {name: 'Momo', color: 'red', band_id: 3},
  Sana: {name: 'Sana', color: 'blue', band_id: 3},
  Jihyo: {name: 'Jihyo', color: 'purple', band_id: 3},
  Mina: {name: 'Mina', color: 'violet', band_id: 3},
  Dahyun: {name: 'Dahyun', color: 'pink', band_id: 3},
  Chaeyoung: {name: 'Chaeyoung', color: 'cyan', band_id: 3},
  Tzuyu: {name: 'Tzuyu', color: 'yellow', band_id: 3},
  Leeteuk: {name: 'Leeteuk', color: 'yellow', band_id: 4},
  Heechul: {name: 'Heechul', color: 'orange', band_id: 4},
  Yesung: {name: 'Yesung', color: 'red', band_id: 4},
  Kangin: {name: 'Kangin', color: 'violet', band_id: 4},
  Shindong: {name: 'Shindong', color: 'pink', band_id: 4},
  Sungmin: {name: 'Sungmin', color: 'purple', band_id: 4},
  Eunhyuk: {name: 'Eunhyuk', color: 'cyan', band_id: 4},
  Donghae: {name: 'Donghae', color: 'blue', band_id: 4},
  Siwon: {name: 'Siwon', color: 'teal', band_id: 4},
  Ryeowook: {name: 'Ryeowook', color: 'green', band_id: 4},
  Kyuhyun: {name: 'Kyuhyun', color: 'grey', band_id: 4},
  Jisoo: {name: 'Jisoo', color: 'forest', band_id: 5},
  Jennie: {name: 'Jennie', color: 'blue', band_id: 5},
  Rose: {name: 'Rosé', color: 'hotpink', band_id: 5},
  Lisa: {name: 'Lisa', color: 'purple', band_id: 5},
  Nadine: {name: 'Nadine', color: 'orange', band_id: 6},
  cheryl: {name: 'Cheryl', color: 'red', band_id: 6},
  Kimberly: {name: 'Kimberly', color: 'pink', band_id: 6},
  sarah: {name: 'Sarah', color: 'yellow', band_id: 6},
  Nicola: {name: 'Nicola', color: 'cyan', band_id: 6},
});

/*

const favorites = seed(Favorite,
  // We're specifying a function here, rather than just a rows object.
  // Using a function lets us receive the previously-seeded rows (the seed
  // function does this wiring for us).
  //
  // This lets us reference previously-created rows in order to create the join
  // rows. We can reference them by the names we used above (which is why we used
  // Objects above, rather than just arrays).
  ({users, things}) => ({
    // The easiest way to seed associations seems to be to just create rows
    // in the join table.
    'obama loves surfing': {
      user_id: users.barack.id,    // users.barack is an instance of the User model
                                   // that we created in the user seed above.
                                   // The seed function wires the promises so that it'll
                                   // have been created already.
      thing_id: things.surfing.id  // Same thing for things.
    },
    'god is into smiting': {
      user_id: users.god.id,
      thing_id: things.smiting.id
    },
    'obama loves puppies': {
      user_id: users.barack.id,
      thing_id: things.puppies.id
    },
    'god loves puppies': {
      user_id: users.god.id,
      thing_id: things.puppies.id
    },
  })
)*/

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0));
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error);
    this.cause = error;
    this.row = row;
    this.key = key;
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`;
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others = {}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows);
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key];
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error); })
                )
            };
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`);
        return seeded;
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`);
      });
  };
}

module.exports = Object.assign(seed, {users});
