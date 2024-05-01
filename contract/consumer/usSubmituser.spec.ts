// handleSubmitUser
import { InteractionObject } from "@pact-foundation/pact";
import { HTTPMethods } from "@pact-foundation/pact/src/common/request";
import { handleSubmitUser } from "../../../api-services/user";
import { provider } from "../../helpers/pactSetup";

const submitUserResponseBodyMock = {
  messageSummary: {
    traceId: "0HMSNR4JSTVVH:00000015",
    messages: [
      {
        title: "User created successfully",
        text: "User created successfully.",
        code: "7019",
        messageIndicatorType: "Information",
        messageDisplayType: "All",
      },
    ],
    isValid: true,
    status: 200,
    statusText: "",
    headers: {
      authorization:
        "Bearer token",
      "content-type": "application/json; charset=utf-8",
    },
  },
};
const interaction: InteractionObject = {
  state: "Request",
  uponReceiving: "Will get the submit user",
  withRequest: {
    method: HTTPMethods.POST,
    path: "/Customer/api/Customer/",
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
    body: submitUserResponseBodyMock,
  },
};
describe("Pact with Provider", () => {
  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());
  it("make request", async () => {
    await provider.addInteraction(interaction);
    // request to consumer
    const response = await handleSubmitUser({
      firstName: "AliRaza",
      id: "c45ca084-488a-412a-eb24-08db715fad4d",
      userName: "aakhtar",
      lastName: "Akhter",
      employeeNumber: "124124",
      email: "aakhtar@..com",
      departmentId: 2423423423,
      enableUser: true,
      passwordExpire: false,
      passwordLocked: false,
      userRole: "3a0d044b-ec0a-46bd-b7c5-aed51b18388f",
      functionalities: [
        {
          productId: "GRPCPT",
          enabled: true,
          isReadOnly: false,
          subscribeToChanges: false,
          alternativeEmail: "",
          productName: "GRPCPT",
        },
      ],
      userLoginOptions: [
        {
          loginOptionId: "AZD",
          loginOptionName: "Azure AD",
          isSelected: true,
        },
        {
          loginOptionId: "QAU",
          loginOptionName: "Qantas Groups Travel",
          isSelected: false,
        },
      ],
      CreatedBy: "",
    });
    expect(response.data).toEqual(submitUserResponseBodyMock);
    expect(response.status).toEqual(200);
  });
});

 
