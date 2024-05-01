
// eslint-disable-next-line import/no-useless-path-segments
import { provider } from "../helpers/pactSetup";

jest.setTimeout(30000);
beforeAll(() => provider.setup());

afterAll(() => provider.verify());
