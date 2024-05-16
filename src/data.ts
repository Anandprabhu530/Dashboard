import { faker } from "@faker-js/faker";

export function createRandomUser() {
  return {
    author_name: faker.person.firstName(),
    first_publish_year: faker.datatype.number(9999),
    author_birth_date: faker.datatype.number(31),
    ratings_average: faker.datatype.float({ max: 10 }),
    title: faker.person.jobTitle(),
    author_top_work: faker.location.city(),
  };
}

export const USERS = faker.helpers.multiple(createRandomUser, {
  count: 50,
});
