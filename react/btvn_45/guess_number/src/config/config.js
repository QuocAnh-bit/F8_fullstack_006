export const RANGE_NUMBER = 100;
export const randomNumber = () => Math.floor(Math.random() * RANGE_NUMBER);
const MAX_TURN = Math.ceil(Math.log2(RANGE_NUMBER));
export default MAX_TURN;
