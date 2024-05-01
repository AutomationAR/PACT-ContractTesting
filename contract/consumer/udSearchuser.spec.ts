import { InteractionObject } from "@pact-foundation/pact";
import { HTTPMethods } from "@pact-foundation/pact/src/common/request";
import { handleGetSearchUser } from "../../../api-services/user";
import { provider } from "../../helpers/pactSetup";
 
const searchResponseBodyMock = {
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
      id: "7b0f303d-9cc1-4c2c-82af-08db97d9b484",
      email: "arham@..com",
      userName: "arham",
      name: "arham arham",
      role: "Airline Admin",
      isEnabled: false,
      externalUserId: "",
    },
    {
      id: "b01ea7ff-9419-4883-8064-203def8086eb",
      email: ".@..com",
      userName: ".",
      name: ". User",
      role: ". Admin",
      isEnabled: true,
      externalUserId: "4e5deafe-6321-439f-a507-79c234295a3a",
    },
    {
      id: "49f17b99-8b48-4dd2-82aa-08db97d9b484",
      email: "haider@..com",
      userName: "haider",
      name: "haiider ali",
      role: "Airline Admin",
      isEnabled: false,
      externalUserId: "",
    },
    {
      id: "5da2c827-ae47-44e1-82ad-08db97d9b484",
      email: "hamza@..com",
      userName: "hamza",
      name: "hamza anees",
      role: "Airline Admin",
      isEnabled: false,
      externalUserId: "",
    },
    {
      id: "4ead47b4-58fc-4dfe-82a7-08db97d9b484",
      email: "AliRaza@..com",
      userName: "Ali Raza",
      name: "AliRaza ali",
      role: "Airline Admin",
      isEnabled: false,
      externalUserId: "",
    },
    {
      id: "b289e18e-1087-41db-82b0-08db97d9b484",
      email: "ahmar@..com",
      userName: "ahmar",
      name: "hassana ahmar",
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
        title: "Users found",
        text: "Users found.",
        code: "7022",
        messageIndicatorType: "Information",
        messageDisplayType: "All",
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
  uponReceiving: "Will get the SearchUser items",
  withRequest: {
    method: HTTPMethods.GET,
    path: "/Customer/api/Customer/./1/10",
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
    body: searchResponseBodyMock,
  },
};
 
describe("Pact with Provider", () => {
  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());
  it("make request", async () => {
    await provider.addInteraction(interaction);
    // request to consumer
    const response = await handleGetSearchUser({
      value: ".",
      page: 1,
      size: 10,
    });
    expect(response).toEqual(searchResponseBodyMock);
    expect(response.status).toEqual(200);
  });
});