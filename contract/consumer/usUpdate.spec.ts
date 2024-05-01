// handleUpdateUser
import { InteractionObject } from "@pact-foundation/pact";
import { HTTPMethods } from "@pact-foundation/pact/src/common/request";

import { handleUpdateUser } from "../../../api-services/user";
import { provider } from "../../helpers/pactSetup";

const userUpdateResponseBodyMock = {
  messageSummary: {
    traceId: "0HMSOKSMFDTS3:00000019",
    messages: [
      {
        title: "User updated successfully",
        text: "User updated successfully.",
        code: "7018",
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
  uponReceiving: "Will get the update User",
  withRequest: {
    method: HTTPMethods.PUT,
    path: "/Customer/updateauthuser",
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
    body: userUpdateResponseBodyMock,
  },
};

describe("Pact with Provider", () => {
  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  it("make request", async () => {
    await provider.addInteraction(interaction);

    // request to consumer
    const response = await handleUpdateUser({
      firstName: "ali",
      id: "12121212",
      userName: "ali",
      updatedBy: "ali",
      lastName: "ali",
      CreatedBy: "ali",
      employeeNumber: "223213121",
      email: "ali@gmail.com",
      departmentId: 23232,
      userRole: "sdsd12",
      enableUser: true,
      passwordExpire: true,
      passwordLocked: true,
      functionalities: [
        {
          enabled: true,
          productId: "77676",
          productName: "5655",
          isReadOnly: true,
          subscribeToChanges: true,
          alternativeEmail: "ali@gmail.com",
        },
      ],
      userLoginOptions: "dsds",
    });
    expect(response.data).toEqual(userUpdateResponseBodyMock);
    expect(response.status).toEqual(200);
  });
});
