// handleGetUserRole
import { InteractionObject } from "@pact-foundation/pact";
import { HTTPMethods } from "@pact-foundation/pact/src/common/request";

import { handleGetUserRole } from "../../../api-services/user";
import { provider } from "../../helpers/pactSetup";

const userRoleResponseBodyMock = {
  messageSummary: {
    isValid: true,
    messages: [
      {
        code: "7034",
        messageDisplayType: "All",
        messageIndicatorType: "Information",
        text: "User types found.",
        title: "Roles found",
      },
    ],
    traceId: "0HMSPD1DIU00E:00000005",
  },
  roles: [
    {
      roleId: "f155d8a8-7906-4866-9eac-3a346382ad36",
      roleName: "Airline Admin",
    },
    {
      roleId: "9fbd17cf-a209-40ca-84f9-3c037702e83a",
      roleName: "RevMan User",
    },
    {
      roleId: "3a0d044b-ec0a-46bd-b7c5-aed51b18388f",
      roleName: ". Admin",
    },
  ],
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
  uponReceiving: "Will get the User Role",
  withRequest: {
    method: HTTPMethods.GET,
    path: "/CustomerRole",
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
    body: userRoleResponseBodyMock,
  },
};

describe("Pact with Provider", () => {
  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  it("make request", async () => {
    await provider.addInteraction(interaction);

    // request to consumer
    const response = await handleGetUserRole();
    expect(response.data).toEqual(userRoleResponseBodyMock);
    expect(response.status).toEqual(200);
  });
});
