// getUsers
import { InteractionObject } from "@pact-foundation/pact";
import { HTTPMethods } from "@pact-foundation/pact/src/common/request";

import { getUsers } from "../../../api-services/user";
import { provider } from "../../helpers/pactSetup";

const userDetailsResponseBodyMock = {
  customerResponses: [
    {
      id: "05c93fdb-f17a-4a95-82a6-08db97d9b484",
      email: "aakhtar@..com",
      userName: "AliRaza",
      name: "AliRaza akhtar",
      role: "Airline Admin",
      isEnabled: true,
      externalUserId: "",
    },
    {
      id: "73c40962-8563-4968-82ac-08db97d9b484",
      email: "haiderali@gmail.com",
      userName: "haiderAli",
      name: "alihaider haider",
      role: "Airline Admin",
      isEnabled: false,
      externalUserId: "",
    },
    {
      id: "e3a80b38-a04b-45e4-82ab-08db97d9b484",
      email: "ali@gmail.com",
      userName: "aliw",
      name: "aliw ahmadw",
      role: "Airline Admin",
      isEnabled: false,
      externalUserId: "",
    },
    {
      id: "7b0f303d-9cc1-4c2c-82af-08db97d9b484",
      email: "arham@..com",
      userName: "arham",
      name: "arham arham",
      role: "Airline Admin",
      isEnabled: false,
      externalUserId: "",
    },
  ],
  currentPage: 1,
  pageSize: 10,
  totalPages: 2,
  recordCount: 10,
  totalRecords: 12,
  messageSummary: {
    traceId: "0HMSNR4JSU00T:0000000B",
    messages: [
      {
        code: "7022",
        messageDisplayType: "All",
        messageIndicatorType: "Information",
        text: "Users found.",
        title: "Users found",
      },
    ],
    isValid: true,
  },
  status: 200,
  statusText: "",
  headers: {
    authorization:
      "Bearer token",
    "content-type": "application/json; charset=utf-8",
  },
};

const interaction: InteractionObject = {
  state: "Request",
  uponReceiving: "Will get the users Details",
  withRequest: {
    method: HTTPMethods.GET,
    path: "/Customer/authservice",
    headers: {
      authorization:
        "Bearer token",
      "content-Type": "application/json; charset=utf-8",
    },
  },
  willRespondWith: {
    status: 200,
    headers: {
      authorization:
        "Bearer token",
      "content-Type": "application/json; charset=utf-8",
    },
    body: userDetailsResponseBodyMock,
  },
};

describe("Pact with Provider", () => {
  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  it("make request", async () => {
    await provider.addInteraction(interaction);

    // request to consumer
    const response = await getUsers({ page: 1, size: 10 });
    expect(response).toEqual(userDetailsResponseBodyMock);
    expect(response.status).toEqual(200);
  });
});
