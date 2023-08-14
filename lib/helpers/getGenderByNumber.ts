type Gender = 'male' | 'female';

const genders: { [key: number]: Gender } = {
  1: 'female',
  2: 'male',
};

export default function getGenderByNumber(value: number): Gender {
  return genders[value];
}
